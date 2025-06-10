
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, ClipboardList, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import type { StaffMember } from '@/types/staff';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function StaffListPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [memberToDelete, setMemberToDelete] = useState<StaffMember | null>(null);
  const { toast } = useToast();

  const fetchStaffMembers = useCallback(async () => {
    setLoading(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setStaffMembers(membersData);
    } catch (error) {
      console.error("Error fetching staff members: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data staf dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStaffMembers();
  }, [fetchStaffMembers]);

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    try {
      await deleteDoc(doc(db, 'staffMembers', memberToDelete.id));
      toast({
        title: "Sukses",
        description: `Staf "${memberToDelete.name}" berhasil dihapus.`,
      });
      setStaffMembers(staffMembers.filter(member => member.id !== memberToDelete.id));
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting staff member: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus staf.",
        variant: "destructive",
      });
      setMemberToDelete(null);
    }
  };

  const filteredMembers = staffMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.phone && member.phone.includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Daftar Staf" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data staf...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Daftar Staf" />
      <main className="flex-1 overflow-y-auto p-6">
        <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Kelola Daftar Staf</CardTitle>
              <CardDescription>Lihat, tambah, ubah, atau hapus data staf Anda, termasuk detail kontak dan gaji.</CardDescription>
            </div>
            <div className="flex gap-2 items-center">
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari staf (nama, peran, no.hp)..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild>
                <Link href="/staff/list/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Staf Baru
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Foto</TableHead>
                  <TableHead>Nama Staf</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>No. HP</TableHead>
                  <TableHead className="text-right">Gaji Pokok</TableHead>
                  <TableHead className="text-center">Bagi Hasil (%)</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        {member.photoUrl ? (
                          <AvatarImage src={member.photoUrl} alt={member.name} data-ai-hint="foto staf"/>
                        ) : (
                          <AvatarFallback>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                    <TableCell>{member.phone || '-'}</TableCell>
                    <TableCell className="text-right">
                      {member.baseSalary ? `Rp ${member.baseSalary.toLocaleString('id-ID')}` : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof member.profitSharePercentage === 'number' ? `${member.profitSharePercentage}%` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                        <Link href={`/staff/list/${member.id}/edit`}>
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setMemberToDelete(member)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredMembers.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                {staffMembers.length > 0 ? 'Tidak ada staf yang cocok dengan pencarian Anda.' : 'Belum ada staf yang terdaftar.'}
                {staffMembers.length === 0 && <Link href="/staff/list/new" className="text-primary hover:underline ml-1">Tambah staf baru</Link>}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Menampilkan {filteredMembers.length} dari {staffMembers.length} staf.</p>
          </CardFooter>
        </Card>
        
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus staf "{memberToDelete?.name}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setMemberToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMember} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
