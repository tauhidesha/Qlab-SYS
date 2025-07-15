"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import FirebaseConfigGuide from '@/components/FirebaseConfigGuide';
import { isUserAllowed } from '@/lib/auth-permissions';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const initializeAuth = async () => {
      try {
        // Set persistence to LOCAL (tetap login meski browser ditutup)
        await setPersistence(auth, browserLocalPersistence);
        console.log('[AuthContext] Auth persistence set to LOCAL for mobile compatibility');
        
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          console.log('[AuthContext] Auth state changed:', user?.email || 'No user');
          
          if (user) {
            // Cek apakah user diizinkan masuk
            if (!isUserAllowed(user)) {
              console.log('User tidak diizinkan:', user.email);
              // Logout user yang tidak diizinkan
              await signOut(auth);
              setUser(null);
              setLoading(false);
              return;
            }
            console.log('[AuthContext] User authorized and session restored:', user.email);
          }
          
          setUser(user);
          setLoading(false);
        });

      } catch (error: any) {
        console.error('Firebase auth initialization error:', error);
        if (error.message?.includes('Missing Firebase configuration')) {
          setConfigError(true);
        }
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Show configuration guide if Firebase is not properly configured
  if (configError) {
    return <FirebaseConfigGuide />;
  }

  const signInWithGoogle = async () => {
    try {
      // Pastikan persistence sudah diset sebelum login
      await setPersistence(auth, browserLocalPersistence);
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      // Add custom parameters for better UX
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      console.log('[AuthContext] Starting Google sign-in...');
      const result = await signInWithPopup(auth, provider);
      console.log('[AuthContext] Sign-in successful:', result.user.email);
      
      // Cek permission setelah login berhasil
      if (!isUserAllowed(result.user)) {
        console.log('[AuthContext] User not allowed:', result.user.email);
        console.log('[AuthContext] User object:', result.user);
        // Logout immediately jika tidak diizinkan
        await signOut(auth);
        throw new Error(`Akun ${result.user.email} tidak memiliki akses ke sistem ini. Hubungi administrator.`);
      }
      
      console.log('[AuthContext] User authorized, session will persist');
      
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      // Handle specific CORS/popup errors
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
        // Try redirect method as fallback
        throw new Error('Popup diblokir. Silakan disable popup blocker dan coba lagi.');
      }
      
      // More specific error handling
      if (error.message?.includes('tidak memiliki akses')) {
        throw error; // Re-throw permission error as-is
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login dibatalkan oleh pengguna');
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Konfigurasi Firebase tidak ditemukan. Hubungi administrator.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Domain tidak diizinkan. Tambahkan localhost:3000 ke authorized domains di Firebase Console.');
      } else if (error.code === 'auth/invalid-api-key') {
        throw new Error('API Key Firebase tidak valid. Periksa konfigurasi .env.local');
      } else if (error.code === 'auth/project-not-found') {
        throw new Error('Project Firebase tidak ditemukan. Periksa PROJECT_ID di .env.local');
      } else {
        throw new Error(`Login gagal: ${error.message || 'Kesalahan tidak diketahui'}`);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
