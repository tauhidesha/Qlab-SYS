
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface QueueItem {
  id: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  status: 'Waiting' | 'In Service' | 'Completed';
  estimatedTime: string;
  staff?: string;
}

export default function QueuePage() {
  const queueItems: QueueItem[] = [
    { id: 'Q001', customerName: 'Budi Santoso', vehicleInfo: 'Honda Beat - B 4321 ABC', service: 'Regular Wash', status: 'Waiting', estimatedTime: '15 min' },
    { id: 'Q002', customerName: 'Citra Lestari', vehicleInfo: 'Yamaha NMAX - D 8765 XYZ', service: 'Full Detailing', status: 'In Service', estimatedTime: '45 min remaining', staff: 'Andi P.' },
    { id: 'Q003', customerName: 'Ahmad Yani', vehicleInfo: 'Suzuki GSX - A 1122 BBB', service: 'Tire Change', status: 'Waiting', estimatedTime: '30 min' },
    { id: 'Q004', customerName: 'Dewi Anggraini', vehicleInfo: 'Kawasaki Ninja - L 5544 CCC', service: 'Oil Change', status: 'Completed', estimatedTime: 'Done', staff: 'Rian S.' },
  ];

  const getStatusBadgeVariant = (status: QueueItem['status']) => {
    if (status === 'In Service') return 'default'; // Blueish from primary
    if (status === 'Completed') return 'secondary'; // Greyish
    return 'outline'; // For waiting (default accent or neutral)
  };
  
  const getStatusIcon = (status: QueueItem['status']) => {
    if (status === 'In Service') return <Clock className="h-4 w-4 text-primary" />;
    if (status === 'Completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Clock className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Queue Management" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Customer Queue</CardTitle>
              <CardDescription>Manage waiting and in-service customers.</CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add to Queue
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queueItems.map((item) => (
                <Card key={item.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.customerName}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize">
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>{item.vehicleInfo} - {item.service}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-1">
                      Estimated Time: {item.estimatedTime}
                    </div>
                    {item.staff && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Avatar className="h-5 w-5 mr-2">
                           <AvatarImage src={`https://placehold.co/40x40.png?text=${item.staff.substring(0,1)}`} data-ai-hint="employee avatar" />
                           <AvatarFallback>{item.staff.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        Serviced by: {item.staff}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit3 className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    {item.status === 'Waiting' && <Button size="sm">Start Service</Button>}
                    {item.status === 'In Service' && <Button size="sm" variant="secondary">Mark Complete</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
            {queueItems.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                The queue is currently empty.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
