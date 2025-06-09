import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Banknote, Users } from 'lucide-react';

export default function StaffPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Staff Management" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Dashboard</CardTitle>
            <CardDescription>Overview and quick access to staff-related modules.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
                <CalendarDays className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Record and view staff attendance, clock-ins, and clock-outs.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/staff/attendance">Go to Attendance</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Payroll</CardTitle>
                <Banknote className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage staff payroll, including profit sharing calculations.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/staff/payroll">Go to Payroll</Link>
                </Button>
              </CardFooter>
            </Card>
             <Card className="md:col-span-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Staff List</CardTitle>
                <Users className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View and manage staff profiles and information.
                </p>
              </CardContent>
              <CardFooter>
                 {/* Placeholder, link to a dedicated staff list page if needed */}
                <Button disabled className="w-full">View Staff List (Coming Soon)</Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
