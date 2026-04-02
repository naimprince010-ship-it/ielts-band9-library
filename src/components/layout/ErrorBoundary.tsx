import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("ErrorBoundary caught:", error);

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Our team has been notified.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for doesn't exist or has been moved.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You need to log in to access this page.";
    } else if (error.status === 503) {
      title = "Service Unavailable";
      message = "Looks like our API is down. Please try again later.";
    } else {
      title = `${error.status} Error`;
      message = error.statusText;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {title}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
