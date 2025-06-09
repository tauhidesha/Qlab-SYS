import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Wrench, ShoppingBag, Search, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServiceProduct {
  id: string;
  name: string;
  type: 'Service' | 'Product';
  category: string;
  price: number;
  description: string;
}

export default function ServicesPage() {
  const items: ServiceProduct[] = [
    { id: 'S001', name: 'Premium Motorcycle Wash', type: 'Service', category: 'Washing', price: 75000, description: 'Complete wash including body, engine, and wheels.' },
    { id: 'S002', name: 'Full Detailing Package', type: 'Service', category: 'Detailing', price: 350000, description: 'Includes wash, polish, wax, and interior cleaning.' },
    { id: 'P001', name: 'Chain Lube (Brand X)', type: 'Product', category: 'Lubricants', price: 60000, description: 'High-performance chain lubricant, 250ml.' },
    { id: 'P002', name: 'Microfiber Towel Set', type: 'Product', category: 'Accessories', price: 50000, description: 'Set of 3 premium microfiber towels.' },
    { id: 'S003', name: 'Helmet Sanitizing', type: 'Service', category: 'Hygiene', price: 20000, description: 'Kills germs and freshens helmet interior.' },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Services & Products" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Service & Product Catalog</CardTitle>
              <CardDescription>Manage your offerings and their details.</CardDescription>
            </div>
             <div className="flex gap-2 items-center">
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search items..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant={item.type === 'Service' ? 'default' : 'secondary'} className="capitalize">
                        {item.type === 'Service' ? <Wrench className="mr-1 h-3 w-3" /> : <ShoppingBag className="mr-1 h-3 w-3" />}
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">Rp {item.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {items.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No services or products found. Add a new item to get started.
              </div>
            )}
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">Showing {items.length} of {items.length} items.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
