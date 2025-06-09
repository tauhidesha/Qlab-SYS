
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; // Consider an order for queue items, e.g., timestamp
import { toast } from "@/hooks/use-toast";

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
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueueItems = async () => {
      setLoading(true);
      console.log("Fetching queue items from Firestore...");
      try {
        const queueCollectionRef = collection(db, 'queueItems');
        // Example: Order by a 'createdAt' timestamp if you add one, or by status
        const q = query(queueCollectionRef); // Add orderBy('status') or a timestamp field
        const querySnapshot = await getDocs(q);
        
        console.log(`Fetched ${querySnapshot.docs.length} queue documents.`);
        
        const itemsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // console.log(`Document ID: ${doc.id}`, data); // Optional: log each document
          return { id: doc.id, ...data } as QueueItem;
        });
        
        console.log('Mapped queue items data:', itemsData);
        setQueueItems(itemsData);

      } catch (error) {
        console.error("Error fetching queue items: ", error);
        let description = "Could not fetch queue data. Please check your internet connection.";
        if (error instanceof Error) {
            description = `Error: ${error.message}. Please check Firestore security rules and collection name ('queueItems').`;
        }
        toast({
          title: "Fetch Error",
          description: description,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQueueItems();
  }, []);

  const getStatusBadgeVariant = (status: QueueItem['status']) => {
    if (status === 'In Service') return 'default'; 
    if (status === 'Completed') return 'secondary'; 
    return 'outline'; 
  };
  
  const getStatusIcon = (status: QueueItem['status']) => {
    if (status === 'In Service') return <Clock className="h-4 w-4 text-primary" />;
    if (status === 'Completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Queue Management" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Loading queue data...</p>
        </div>
      </div>
    );
  }

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
            {queueItems.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground">
                The queue is currently empty.
                {/* You can add a link to add items or check if data was expected */}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
