import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Bike, Star, Search } from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  phone: string;
  motorcycles: { name: string; licensePlate: string }[];
  loyaltyPoints: number;
  lastVisit: string;
}

export default function ClientsPage() {
  const clients: Client[] = [
    { id: 'C001', name: 'Rina Amelia', phone: '0812-3456-7890', motorcycles: [{ name: 'Honda Vario 150', licensePlate: 'B 1234 RIN' }, { name: 'Yamaha XMAX', licensePlate: 'B 5678 AML' }], loyaltyPoints: 1250, lastVisit: '2024-07-15' },
    { id: 'C002', name: 'Bambang Pamungkas', phone: '0821-9876-5432', motorcycles: [{ name: 'Kawasaki W175', licensePlate: 'D 4321 BAM' }], loyaltyPoints: 800, lastVisit: '2024-07-10' },
    { id: 'C003', name: 'Siti Fatimah', phone: '0855-1122-3344', motorcycles: [{ name: 'Suzuki Address', licensePlate: 'F 9876 SIT' }], loyaltyPoints: 200, lastVisit: '2024-06-20' },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Client Management" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Client List</CardTitle>
              <CardDescription>Manage client data, motorcycles, and loyalty points.</CardDescription>
            </div>
            <div className="flex gap-2 items-center">
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search clients..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
              </div>
              <Button asChild>
                <Link href="/clients/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Motorcycles</TableHead>
                  <TableHead className="text-center">Loyalty Points</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-sm">
                        {client.motorcycles.map(mc => (
                          <li key={mc.licensePlate}>
                            {mc.name} ({mc.licensePlate})
                          </li>
                        ))}
                        {client.motorcycles.length === 0 && <span className="text-muted-foreground">No motorcycles</span>}
                      </ul>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {client.loyaltyPoints.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{client.lastVisit}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                        <Link href={`/clients/${client.id}/edit`}>
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {clients.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No clients found. <Link href="/clients/new" className="text-primary hover:underline">Add a new client</Link>.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Showing {clients.length} of {clients.length} clients.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
