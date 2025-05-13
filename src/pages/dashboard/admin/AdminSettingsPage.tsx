
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    darkMode: false,
    autoApprove: false,
    maintenanceMode: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  return (
    <DashboardLayout pageTitle="Admin Settings">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for system events</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive SMS alerts for critical events</p>
              </div>
              <Switch 
                id="sms-notifications" 
                checked={settings.smsNotifications} 
                onCheckedChange={() => handleToggle('smsNotifications')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor" className="font-medium">Two Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch 
                id="two-factor" 
                checked={settings.twoFactorAuth} 
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark mode for all admin users</p>
              </div>
              <Switch 
                id="dark-mode" 
                checked={settings.darkMode} 
                onCheckedChange={() => handleToggle('darkMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-approve" className="font-medium">Auto-approve New Courses</Label>
                <p className="text-sm text-muted-foreground">Automatically approve new courses submitted by instructors</p>
              </div>
              <Switch 
                id="auto-approve" 
                checked={settings.autoApprove} 
                onCheckedChange={() => handleToggle('autoApprove')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance" className="font-medium">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
              </div>
              <Switch 
                id="maintenance" 
                checked={settings.maintenanceMode} 
                onCheckedChange={() => handleToggle('maintenanceMode')}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
