
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Palette, Bell, Users, CreditCard as CreditCardIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Settings" />
      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="general"><Building className="mr-2 h-4 w-4 hidden md:inline" />General</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4 hidden md:inline" />Appearance</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 hidden md:inline" />Notifications</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4 hidden md:inline" />User Roles</TabsTrigger>
            <TabsTrigger value="billing"><CreditCardIcon className="mr-2 h-4 w-4 hidden md:inline" />Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your workshop information and basic settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workshop-name">Workshop Name</Label>
                  <Input id="workshop-name" defaultValue="QLAB Auto Detailing" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-address">Address</Label>
                  <Input id="workshop-address" defaultValue="Jl. Sudirman No. 123, Jakarta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-phone">Phone Number</Label>
                  <Input id="workshop-phone" type="tel" defaultValue="+62 21 555 0123" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="loyalty-program" className="font-medium">Enable Loyalty Program</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to earn and redeem points.</p>
                  </div>
                  <Switch id="loyalty-program" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Theme settings (e.g., light/dark mode toggle) can be managed here.</p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
                  <Switch id="dark-mode-toggle" checked disabled aria-readonly /> 
                  <span className="text-xs text-muted-foreground">(Default and recommended)</span>
                </div>
              </CardContent>
               <CardFooter>
                <Button disabled>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
             <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Notification settings will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
             <Card>
              <CardHeader>
                <CardTitle>User Roles & Permissions</CardTitle>
                <CardDescription>Manage staff accounts and their access levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">User role management will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
             <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription plan and payment methods.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Billing information will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
