import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-muted-foreground mb-8">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="text-primary hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
}