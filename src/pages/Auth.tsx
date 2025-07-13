import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'buyer' | 'seller') => {
    // In a real app, you'd validate credentials here
    if (email && password) {
      login({ email, role });
      navigate(role === 'buyer' ? '/buyer' : '/seller');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Aura Auction</CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buyer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="buyer">
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email</Label>
                  <Input id="buyer-email" type="email" placeholder="buyer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-password">Password</Label>
                  <Input id="buyer-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleLogin('buyer')} className="w-full">
                  Sign in as Buyer
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="seller">
            <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="seller-email">Email</Label>
                  <Input id="seller-email" type="email" placeholder="seller@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-password">Password</Label>
                  <Input id="seller-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={() => handleLogin('seller')} className="w-full">
                  Sign in as Seller
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}