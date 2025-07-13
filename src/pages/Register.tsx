import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (role: 'buyer' | 'seller') => {
    if (email && password) {
      // In a real app, you would have a separate signUp function
      // For this demo, we'll just log them in directly
      login({ email, role });
      navigate(role === 'buyer' ? '/buy' : '/sell');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Aura Auction</span>
        </Link>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Join Aura Auction to start buying or selling.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buyer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
              <TabsTrigger value="seller">I'm a Seller</TabsTrigger>
            </TabsList>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <TabsContent value="buyer" className="pt-4">
              <Button onClick={() => handleRegister('buyer')} className="w-full">
                Register as a Buyer
              </Button>
            </TabsContent>
            <TabsContent value="seller" className="pt-4">
              <Button onClick={() => handleRegister('seller')} className="w-full">
                Register as a Seller
              </Button>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/auth" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}