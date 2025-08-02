
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Download, Loader2, History, Edit3, RefreshCcw, AlertTriangle, Send } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp, doc, updateDoc, addDoc } from 'firebase/firestore';
import type { Transaction } from '@/types/transaction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import type { DateRange } from "react-day-picker";

export default function TransactionHistoryPage() {
  const [paidTransactions, setPaidTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const { toast } = useToast();

  // States for editing and refunding
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [refundingTransaction, setRefundingTransaction] = useState<Transaction | null>(null);
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isSubmittingRefund, setIsSubmittingRefund] = useState(false);

  // States for resend receipt
  const [resendingReceipt, setResendingReceipt] = useState<string | null>(null); // transaction id
  const [resendPhoneNumber, setResendPhoneNumber] = useState('');
  const [showResendDialog, setShowResendDialog] = useState(false);


  useEffect(() => {
    const fetchPaidTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const transactionsRef = collection(db, 'transactions');
        let q = query(transactionsRef, where('status', '==', 'paid'), orderBy('paidAt', 'desc'));
        
        if (dateRange?.from) {
          const fromTimestamp = Timestamp.fromDate(dateRange.from);
          let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999)); // End of day for 'from' if 'to' is not set
          if (!dateRange.to) dateRange.to = dateRange.from;

          q = query(transactionsRef, 
            where('status', '==', 'paid'), 
            where('paidAt', '>=', fromTimestamp),
            where('paidAt', '<=', toTimestamp),
            orderBy('paidAt', 'desc')
          );
        }


        const querySnapshot = await getDocs(q);
        const transactionsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Transaction;
          return {
            ...data,
            id: doc.id,
            paidAt: data.paidAt, 
            createdAt: data.createdAt,
          };
        });
        setPaidTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching paid transactions: ", error);
        toast({
          title: "Error",
          description: "Tidak dapat mengambil riwayat transaksi.",
          variant: "destructive",
        });
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchPaidTransactions();
  }, [toast, dateRange]);

  const formatTimestamp = (timestamp?: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleString('id-ID', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditedCustomerName(transaction.customerName);
    setEditedNotes(transaction.notes || '');
  };

  const handleRefundTransaction = (transaction: Transaction) => {
    setRefundingTransaction(transaction);
    setRefundReason('');
  };

  const handleResendReceipt = (transaction: Transaction) => {
    setResendingReceipt(transaction.id);
    setResendPhoneNumber('');
    setShowResendDialog(true);
  };

  const formatWhatsAppNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
      cleaned = '62' + cleaned;
    } else if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned;
    }
    return cleaned;
  };

  const generateWhatsAppReceiptText = (transaction: Transaction): string => {
    const SHOP_NAME = "Bosmat Repainting and Detailing Studio";
    
    let text = `*Struk Digital - ${SHOP_NAME}*\n\n`;
    text += `ID Transaksi: ${transaction.id.substring(0, 8)}...\n`;
    text += `Pelanggan: ${transaction.customerName}\n`;
    
    if (transaction.paidAt && transaction.paidAt.toDate) {
      text += `Tanggal: ${transaction.paidAt.toDate().toLocaleString('id-ID', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })}\n\n`;
    } else {
      text += `Tanggal: ${new Date().toLocaleString('id-ID', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })}\n\n`;
    }

    text += `Item:\n`;
    transaction.items.forEach(item => {
      text += `- ${item.name} (${item.quantity} x Rp ${item.price.toLocaleString('id-ID')})`;
      if (item.staffName) text += ` (Oleh: ${item.staffName})`;
      if (item.type === 'reward_merchandise') text += ` (REWARD)`;
      text += ` = Rp ${(item.quantity * item.price).toLocaleString('id-ID')}\n`;
    });
    
    text += `\nSubtotal: Rp ${transaction.subtotal.toLocaleString('id-ID')}\n`;

    if (transaction.discountAmount && transaction.discountAmount > 0) {
      text += `Diskon Manual: - Rp ${transaction.discountAmount.toLocaleString('id-ID')}\n`;
    }

    text += `*Total: Rp ${transaction.total.toLocaleString('id-ID')}*\n`;
    text += `Metode Bayar: ${transaction.paymentMethod || 'N/A'}\n`;

    if (transaction.pointsEarnedInThisTx && transaction.pointsEarnedInThisTx > 0) {
      text += `Poin Baru Diperoleh: ${transaction.pointsEarnedInThisTx.toLocaleString('id-ID')} poin\n`;
    }

    const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://repaintdandetailingmotor-bosmat.vercel.app'}/feedback/${transaction.id}`;
    text += `\nKami sangat menghargai masukan Anda! Isi survei singkat di: ${feedbackUrl}`;
    text += `\n\nTerima kasih atas kunjungan Anda!`;
    
    return text;
  };

  const submitResendReceipt = async () => {
    if (!resendingReceipt || !resendPhoneNumber.trim()) return;
    
    const transaction = paidTransactions.find(tx => tx.id === resendingReceipt);
    if (!transaction) return;

    setResendingReceipt('submitting');
    try {
      const formattedNumber = formatWhatsAppNumber(resendPhoneNumber);
      const receiptText = generateWhatsAppReceiptText(transaction);

      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: formattedNumber,
          message: receiptText
        })
      });

      if (response.ok) {
        toast({
          title: "Sukses",
          description: `Struk berhasil dikirim ulang ke ${resendPhoneNumber}`
        });
      } else {
        throw new Error('Gagal mengirim struk');
      }

      setShowResendDialog(false);
      setResendingReceipt(null);
    } catch (error) {
      console.error("Error resending receipt:", error);
      toast({
        title: "Error",
        description: "Gagal mengirim ulang struk.",
        variant: "destructive"
      });
      setResendingReceipt(null);
    }
  };

  const submitEditTransaction = async () => {
    if (!editingTransaction) return;
    
    setIsSubmittingEdit(true);
    try {
      const transactionRef = doc(db, 'transactions', editingTransaction.id);
      await updateDoc(transactionRef, {
        customerName: editedCustomerName,
        notes: editedNotes,
        updatedAt: Timestamp.now()
      });

      // Update local state
      setPaidTransactions(prev => 
        prev.map(tx => 
          tx.id === editingTransaction.id 
            ? { ...tx, customerName: editedCustomerName, notes: editedNotes }
            : tx
        )
      );

      toast({
        title: "Sukses",
        description: "Transaksi berhasil diperbarui."
      });

      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui transaksi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const submitRefundTransaction = async () => {
    if (!refundingTransaction) return;
    
    setIsSubmittingRefund(true);
    try {
      // Update transaction status to refunded
      const transactionRef = doc(db, 'transactions', refundingTransaction.id);
      await updateDoc(transactionRef, {
        status: 'refunded',
        refundReason: refundReason,
        refundedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Create refund record in expenses collection
      await addDoc(collection(db, 'expenses'), {
        date: Timestamp.now(),
        category: 'Refund',
        description: `Refund untuk transaksi ${refundingTransaction.id.substring(0, 8)}... - ${refundingTransaction.customerName}`,
        amount: refundingTransaction.total,
        notes: `Alasan refund: ${refundReason}`,
        relatedTransactionId: refundingTransaction.id,
        paymentSource: 'Kas Tunai',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Remove from local state (since it's no longer a paid transaction)
      setPaidTransactions(prev => prev.filter(tx => tx.id !== refundingTransaction.id));

      toast({
        title: "Sukses",
        description: `Refund sebesar Rp ${refundingTransaction.total.toLocaleString('id-ID')} berhasil diproses.`
      });

      setRefundingTransaction(null);
    } catch (error) {
      console.error("Error processing refund:", error);
      toast({
        title: "Error",
        description: "Gagal memproses refund.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingRefund(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <AppHeader title="Riwayat Transaksi" />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <Card className="h-fit">
          <CardHeader className="pb-4 space-y-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Filter Riwayat</CardTitle>
              <CardDescription className="text-sm">
                Pilih rentang tanggal untuk melihat riwayat transaksi.
              </CardDescription>
            </div>
            
            {/* Mobile-first controls layout */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
              <Button variant="outline" disabled className="w-full sm:w-auto sm:flex-shrink-0">
                <Download className="mr-2 h-4 w-4" /> 
                <span className="hidden sm:inline">Ekspor Laporan</span>
                <span className="sm:hidden">Ekspor</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <History className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>
              Riwayat Transaksi Terbayar
            </CardTitle>
            <CardDescription className="text-sm">
              Daftar semua transaksi yang telah berhasil dibayar berdasarkan filter tanggal di atas.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            {loadingTransactions ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Memuat riwayat transaksi...</p>
              </div>
            ) : paidTransactions.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Tidak ada transaksi terbayar yang ditemukan untuk periode yang dipilih.
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tgl. Bayar</TableHead>
                        <TableHead>Nama Pelanggan</TableHead>
                        <TableHead className="text-right">Total (Rp)</TableHead>
                        <TableHead>Metode Pembayaran</TableHead>
                        <TableHead>Staf Layanan</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paidTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatTimestamp(transaction.paidAt)}</TableCell>
                          <TableCell className="font-medium">{transaction.customerName}</TableCell>
                          <TableCell className="text-right">{transaction.total.toLocaleString('id-ID')}</TableCell>
                          <TableCell>{transaction.paymentMethod || 'N/A'}</TableCell>
                          <TableCell>{transaction.serviceStaffName || 'N/A'}</TableCell>
                          <TableCell className="text-xs max-w-[200px] truncate">{transaction.notes || '-'}</TableCell>
                          <TableCell className="text-center min-w-[280px]">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => {
                                    console.log('Edit clicked for transaction:', transaction.id);
                                    handleEditTransaction(transaction);
                                  }}
                                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                  type="button"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => {
                                    console.log('Resend receipt clicked for transaction:', transaction.id);
                                    handleResendReceipt(transaction);
                                  }}
                                  className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                  type="button"
                                >
                                  📱 Kirim Struk
                                </button>
                              </div>
                              <button
                                onClick={() => {
                                  console.log('Refund clicked for transaction:', transaction.id);
                                  handleRefundTransaction(transaction);
                                }}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                type="button"
                              >
                                🔄 Refund
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="md:hidden space-y-3">
                  {paidTransactions.map((transaction) => (
                    <Card key={transaction.id} className="shadow-sm border border-orange-300">
                      <div className="p-3 space-y-3">
                        {/* Header Row: Date and Payment Method */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground font-medium">
                            {formatTimestamp(transaction.paidAt)}
                          </div>
                          <div className="text-xs bg-orange-500 px-2 py-1 rounded text-white">
                            {transaction.paymentMethod || 'N/A'}
                          </div>
                        </div>
                        
                        {/* Customer Info and Amount */}
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base leading-tight text-orange-500">{transaction.customerName}</h3>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">
                              Rp {transaction.total.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                        
                        {/* Staff and Notes */}
                        <div className="space-y-1">
                          {transaction.serviceStaffName && (
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground">Staf:</span>
                              <span className="ml-1 font-medium">{transaction.serviceStaffName}</span>
                            </div>
                          )}
                          {transaction.notes && (
                            <div className="pt-2 border-t border-gray-100">
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Catatan:</span> {transaction.notes}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTransaction(transaction)}
                            className="h-8 px-3"
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResendReceipt(transaction)}
                            className="h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Kirim Struk
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRefundTransaction(transaction)}
                            className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <RefreshCcw className="h-4 w-4 mr-1" />
                            Refund
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center sm:justify-start px-3 sm:px-6 py-4">
            <p className="text-xs text-muted-foreground">
              Menampilkan <span className="font-medium">{paidTransactions.length}</span> transaksi terbayar
            </p>
          </CardFooter>
        </Card>

        {/* Edit Transaction Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={(open) => !open && setEditingTransaction(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Transaksi</DialogTitle>
              <DialogDescription>
                Edit informasi transaksi {editingTransaction?.id.substring(0, 8)}...
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Nama Pelanggan
                </Label>
                <Input
                  id="customerName"
                  value={editedCustomerName}
                  onChange={(e) => setEditedCustomerName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Catatan
                </Label>
                <Textarea
                  id="notes"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingTransaction(null)}>
                Batal
              </Button>
              <Button 
                onClick={submitEditTransaction} 
                disabled={isSubmittingEdit || !editedCustomerName.trim()}
              >
                {isSubmittingEdit ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Refund Transaction Dialog */}
        <AlertDialog open={!!refundingTransaction} onOpenChange={(open) => !open && setRefundingTransaction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Konfirmasi Refund
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>
                  Anda akan memproses refund untuk transaksi <strong>{refundingTransaction?.id.substring(0, 8)}...</strong> 
                  atas nama <strong>{refundingTransaction?.customerName}</strong>
                </p>
                <p>
                  Jumlah refund: <strong>Rp {refundingTransaction?.total.toLocaleString('id-ID')}</strong>
                </p>
                <div className="mt-4">
                  <Label htmlFor="refundReason">Alasan Refund (wajib)</Label>
                  <Textarea
                    id="refundReason"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="Jelaskan alasan refund..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setRefundingTransaction(null)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={submitRefundTransaction}
                disabled={isSubmittingRefund || !refundReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmittingRefund ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Proses Refund'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Resend Receipt Dialog */}
        <Dialog open={showResendDialog} onOpenChange={(open) => !open && setShowResendDialog(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-green-500" />
                Kirim Ulang Struk WhatsApp
              </DialogTitle>
              <DialogDescription>
                Kirim ulang struk digital untuk transaksi ini melalui WhatsApp.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Nomor WhatsApp
                </Label>
                <Input
                  id="phoneNumber"
                  value={resendPhoneNumber}
                  onChange={(e) => setResendPhoneNumber(e.target.value)}
                  placeholder="08xxxxxxxxx atau 628xxxxxxxxx"
                  className="col-span-3"
                />
              </div>
              <div className="text-sm text-muted-foreground px-4">
                <p className="mb-2">Format nomor yang didukung:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>08123456789</li>
                  <li>628123456789</li>
                  <li>8123456789</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowResendDialog(false)}>
                Batal
              </Button>
              <Button 
                onClick={submitResendReceipt} 
                disabled={resendingReceipt === 'submitting' || !resendPhoneNumber.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {resendingReceipt === 'submitting' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Struk
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
