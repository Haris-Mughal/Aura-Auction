import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'sold' | 'draft';
  image: string;
}

const sampleListings: Listing[] = [
  { id: '1', title: 'Vintage Rolex Submariner 1980s', price: 9500, status: 'active', image: '/placeholder.svg' },
  { id: '2', title: 'Omega Speedmaster Professional', price: 4200, status: 'sold', image: '/placeholder.svg' },
  { id: '3', title: 'Seiko 5 Sports Vintage', price: 150, status: 'draft', image: '/placeholder.svg' },
];

export default function MyListings() {
  const [listings, setListings] = useState(sampleListings);

  const handleDelete = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listings.map(listing => (
            <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img src={listing.image} alt={listing.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">${listing.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={listing.status === 'active' ? 'default' : listing.status === 'sold' ? 'secondary' : 'outline'}>
                  {listing.status}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => alert('Edit functionality not implemented yet.')}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(listing.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}