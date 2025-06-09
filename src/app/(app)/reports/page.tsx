"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Download } from 'lucide-react';
import { LineChart, Bar, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, CartesianGrid, Line, Cell } from 'recharts'; // Using recharts directly for more control & added Cell


export default function ReportsPage() {
  const incomeData = [
    { month: 'Jan', income: 4000000 }, { month: 'Feb', income: 3000000 },
    { month: 'Mar', income: 5000000 }, { month: 'Apr', income: 4500000 },
    { month: 'May', income: 6000000 }, { month: 'Jun', income: 5500000 },
    { month: 'Jul', income: 7000000 },
  ];

  const expenseData = [
    { month: 'Jan', expense: 1500000 }, { month: 'Feb', expense: 1200000 },
    { month: 'Mar', expense: 1800000 }, { month: 'Apr', expense: 1600000 },
    { month: 'May', expense: 2000000 }, { month: 'Jun', expense: 1900000 },
    { month: 'Jul', expense: 2200000 },
  ];
  
  const serviceBreakdownData = [
    { name: 'Washing', value: 400 },
    { name: 'Detailing', value: 300 },
    { name: 'Repairs', value: 200 },
    { name: 'Products', value: 100 },
  ];
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];


  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Income & Expense Reports" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Report Filters</CardTitle>
              <CardDescription>Select date range and report type.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerWithRange />
              <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income</CardTitle>
              <CardDescription>Income trend over the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `Rp${value/1000000}M`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
              <CardDescription>Expense trend over the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `Rp${value/1000000}M`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
            <CardHeader>
              <CardTitle>Service Breakdown</CardTitle>
              <CardDescription>Distribution of services/products sold.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                  <RechartsLegend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

      </main>
    </div>
  );
}
