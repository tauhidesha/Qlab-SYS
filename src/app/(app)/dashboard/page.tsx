
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChartBig, Users, ShoppingCart, ListOrdered, Database } from 'lucide-react';
import { seedAllMockData } from '@/lib/seedFirestore';
import { toast } from "@/hooks/use-toast";
import React from 'react';

export default function DashboardPage() {
  const summaryCards = [
    { title: "Today's Revenue", value: "Rp 1.250.000", icon: ShoppingCart, change: "+15%", dataAiHint: "money graph" },
    { title: "Customers Served", value: "25", icon: Users, change: "+5", dataAiHint: "people queue" },
    { title: "Queue Length", value: "3", icon: ListOrdered, dataAiHint: "waiting list" },
    { title: "Pending Services", value: "8", icon: BarChartBig, dataAiHint: "tasks progress" },
  ];

  const [isSeeding, setIsSeeding] = React.useState(false);

  const handleSeedData = async () => {
    setIsSeeding(true);
    toast({
      title: "Seeding Data...",
      description: "Please wait while mock data is being pushed to Firestore.",
    });
    const result = await seedAllMockData();
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error Seeding Data",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSeeding(false);
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Initialize your Firestore database with mock data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSeedData} disabled={isSeeding}>
              <Database className="mr-2 h-4 w-4" />
              {isSeeding ? "Seeding Data..." : "Seed Mock Data to Firestore"}
            </Button>
             <p className="text-xs text-muted-foreground mt-2">
              Click this button to populate your Firestore collections with the initial mock data.
              This is useful for development and testing. Data with existing IDs will be overwritten.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && <p className="text-xs text-muted-foreground">{card.change} from yesterday</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Overview of the latest sales.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for recent transactions table or list */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                      <p className="font-medium">Service {i + 1}: Full Detailing</p>
                      <p className="text-sm text-muted-foreground">Client: John Doe - Honda CBR250RR</p>
                    </div>
                    <p className="font-semibold text-primary">Rp 350.000</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Queue</CardTitle>
              <CardDescription>Customers waiting for service.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for current queue list */}
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border bg-card">
                    <div className="flex items-center gap-3">
                       <Users className="h-5 w-5 text-accent" />
                       <div>
                         <p className="font-medium">Customer #{i+153}</p>
                         <p className="text-xs text-muted-foreground">Motorcycle Wash</p>
                       </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Waiting</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
