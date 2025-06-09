import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, LogIn, LogOut, UserCheck, UserX, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
  id: string;
  staffName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'On Leave';
}

export default function AttendancePage() {
  const attendanceRecords: AttendanceRecord[] = [
    { id: 'A001', staffName: 'Andi P.', date: '2024-07-28', clockIn: '08:55', clockOut: '17:05', status: 'Present' },
    { id: 'A002', staffName: 'Budi S.', date: '2024-07-28', clockIn: '09:15', clockOut: '17:00', status: 'Late' },
    { id: 'A003', staffName: 'Rian S.', date: '2024-07-28', status: 'Absent' },
    { id: 'A004', staffName: 'Siti K.', date: '2024-07-28', clockIn: '09:00', status: 'Present' }, // Still clocked in
    { id: 'A005', staffName: 'Eko W.', date: '2024-07-27', clockIn: '09:02', clockOut: '17:03', status: 'Present' },
  ];

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch(status) {
      case 'Present': return <Badge variant="default"><UserCheck className="mr-1 h-3 w-3" />Present</Badge>;
      case 'Absent': return <Badge variant="destructive"><UserX className="mr-1 h-3 w-3" />Absent</Badge>;
      case 'Late': return <Badge variant="outline" className="border-yellow-500 text-yellow-500"><Clock className="mr-1 h-3 w-3" />Late</Badge>;
      case 'On Leave': return <Badge variant="secondary">On Leave</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Staff Attendance" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance Log</CardTitle>
                <CardDescription>Daily staff attendance records for {new Date().toLocaleDateString('en-CA')}.</CardDescription>
              </div>
              <Button><PlusCircle className="mr-2 h-4 w-4" /> Manual Entry</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.filter(r => r.date === new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.staffName}</TableCell>
                      <TableCell>{record.clockIn || 'N/A'}</TableCell>
                      <TableCell>{record.clockOut || (record.clockIn ? 'Clocked In' : 'N/A')}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right">
                        {!record.clockIn && <Button variant="outline" size="sm"><LogIn className="mr-1 h-3 w-3"/> Clock In</Button>}
                        {record.clockIn && !record.clockOut && <Button variant="outline" size="sm"><LogOut className="mr-1 h-3 w-3"/> Clock Out</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Select a date to view attendance.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                // selected={new Date()} // Implement date selection state
                // onSelect={}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
