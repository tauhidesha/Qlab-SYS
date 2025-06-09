
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Users, CreditCard } from 'lucide-react';

export default function PosPage() {
  // Placeholder data
  const cartItems = [
    { id: 1, name: 'Premium Motorcycle Wash', price: 75000, quantity: 1 },
    { id: 2, name: 'Chain Lube Service', price: 25000, quantity: 1 },
    { id: 3, name: 'Microfiber Towel', price: 50000, quantity: 2 },
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const loyaltyDiscount = 10000; // Example
  const total = subtotal - loyaltyDiscount;

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Point of Sale" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Cart and Product/Service Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Add services or products to the current order.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search-item">Search Service/Product</Label>
                  <div className="flex gap-2">
                    <Input id="search-item" placeholder="e.g., Motorcycle Wash, Helmet Sanitizer" />
                    <Button variant="outline" size="icon"><PlusCircle className="h-5 w-5" /></Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={item.quantity} className="w-16 h-8" />
                        </TableCell>
                        <TableCell className="text-right">Rp {item.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right">Rp {(item.price * item.quantity).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Customer, Employee, Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer & Staff</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-select">Customer</Label>
                <Select>
                  <SelectTrigger id="customer-select">
                    <SelectValue placeholder="Select or add customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe (Honda CBR250RR - B 1234 XYZ)</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith (Yamaha NMAX - D 5678 ABC)</SelectItem>
                    <SelectItem value="new-customer">
                      <div className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" /> Add New Customer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employee-select">Servicing Staff</Label>
                <Select>
                  <SelectTrigger id="employee-select">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff-1">Andi P.</SelectItem>
                    <SelectItem value="staff-2">Budi S.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Loyalty Discount</span>
                <span className="text-green-500">- Rp {loyaltyDiscount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
                <Button className="w-full">
                  <CreditCard className="mr-2 h-5 w-5" /> Process Payment
                </Button>
                <Button variant="outline" className="w-full">Save as Draft</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
