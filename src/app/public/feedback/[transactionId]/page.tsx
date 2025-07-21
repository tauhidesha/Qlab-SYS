"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
// Hapus impor manual FeedbackFormData dari file lain
// import type { FeedbackFormData } from '@/types/feedback'; 
import Link from 'next/link';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils'; // Import cn utility if not already present


// 1. Definisikan skema sebagai satu-satunya sumber kebenaran
const feedbackFormSchema = z.object({
  rating: z.number({ required_error: "Rating wajib diisi." }).min(1, "Rating wajib diisi.").max(5),
  suggestion: z.string().min(1, "Saran atau masukan tidak boleh kosong."),
  customerName: z.string().optional(),
  customerContact: z.string().optional(),
});

// 2. Buat tipe FeedbackFormData secara otomatis dari skema di atas
type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  // Pastikan params.transactionId selalu string, fallback ke '' jika tidak ada
  const transactionId = params && typeof params === 'object' && 'transactionId' in params && typeof params.transactionId === 'string' && params.transactionId ? params.transactionId : '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [transactionExists, setTransactionExists] = useState<boolean | null>(null);

  // 3. Sekarang useForm<FeedbackFormData> akan 100% cocok dengan resolver
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      rating: undefined,
      suggestion: '',
      customerName: '',
      customerContact: '',
    },
  });

  useEffect(() => {
    const checkTransaction = async () => {
      if (!transactionId) {
        setTransactionExists(false);
        return;
      }
      try {
        const transactionDocRef = doc(db, 'transactions', transactionId);
        const docSnap = await getDoc(transactionDocRef);
        setTransactionExists(docSnap.exists());
      } catch (error) {
        console.error("Error checking transaction:", error);
        setTransactionExists(false); // Assume not found on error
      }
    };
    checkTransaction();
  }, [transactionId]);


  const onSubmit = async (data: FeedbackFormData) => {
    if (!transactionId || !transactionExists) {
        toast({ title: "Error", description: "ID Transaksi tidak valid atau tidak ditemukan.", variant: "destructive"});
        return;
    }
    setIsSubmitting(true);
    try {
      const feedbackData = {
        ...data,
        transactionId: transactionId,
        createdAt: serverTimestamp(),
        isReviewed: false,
      };
      await addDoc(collection(db, 'feedbackEntries'), feedbackData);
      setSubmissionSuccess(true);
      toast({ title: "Terima Kasih!", description: "Masukan Anda telah berhasil dikirim." });
      form.reset();
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      toast({ title: "Gagal Mengirim", description: "Terjadi kesalahan. Silakan coba lagi.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (transactionExists === null) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Memverifikasi transaksi...</p>
        </div>
    );
  }

  if (!transactionExists) {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="items-center">
                <Logo className="mb-4 h-10"/>
                <CardTitle>Link Tidak Valid</CardTitle>
                <CardDescription>Maaf, link feedback ini tidak valid atau transaksi tidak ditemukan.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <Button asChild variant="outline">
                    <Link href="/">Kembali ke Halaman Utama</Link>
                </Button>
            </CardContent>
        </Card>
    );
  }

  if (submissionSuccess) {
    return (
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader className="items-center">
            <Logo className="mb-4 h-10"/>
        </CardHeader>
        <CardContent className="space-y-6">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
          <h2 className="text-3xl font-semibold">Terima Kasih!</h2>
          <p className="text-muted-foreground text-lg">
            Masukan Anda sangat berharga bagi kami untuk terus meningkatkan kualitas layanan QLAB Auto Detailing.
          </p>
            <p className="text-sm text-muted-foreground">
            ID Transaksi: {transactionId.substring(0,8)}...
          </p>
        </CardContent>
         <CardFooter className="justify-center">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} QLAB Auto Detailing</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="items-center">
        <Logo className="mb-4 h-10"/>
        <CardTitle className="text-2xl">Berikan Masukan Anda</CardTitle>
        <CardDescription>
          Kami menghargai waktu Anda untuk membantu kami menjadi lebih baik.
          <br /> (Transaksi ID: {transactionId.substring(0,8)}...)
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Seberapa puas Anda dengan layanan kami?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value !== undefined ? String(field.value) : ""}
                      className="flex justify-center space-x-2"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <FormItem key={num} className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={String(num)} id={`rating-${num}`} className="sr-only peer" />
                          </FormControl>
                          <FormLabel
                            htmlFor={`rating-${num}`}
                            className="cursor-pointer peer-data-[state=checked]:text-yellow-400 [&:hover]:text-yellow-300"
                          >
                            <Star
                              className={cn(
                                "h-8 w-8 md:h-10 md:w-10",
                                (field.value || 0) >= num ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                              )}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suggestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saran atau Kritik Anda</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tuliskan masukan Anda di sini..."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nama Anda (Opsional)</FormLabel>
                    <FormControl><Input placeholder="Nama Anda" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="customerContact"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Kontak Anda (Opsional)</FormLabel>
                    <FormControl><Input placeholder="No. HP / Email" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Kirim Masukan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
