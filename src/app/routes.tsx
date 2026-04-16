import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { ListingDetail } from './pages/ListingDetail';
import { HostProfile } from './pages/HostProfile';
import { Bookings } from './pages/Bookings';
import { BecomeHost } from './pages/BecomeHost';
import { Header } from './components/Header';
import { Toaster } from './components/ui/sonner';

function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header />}
      <main>{children}</main>
      <Toaster />
      <footer className="bg-secondary/20 border-t border-border/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="serif text-xl text-foreground mb-4">Social Dine</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Home-cooked meals, real people, your neighborhood
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors">Find a dinner</a></li>
                <li><a href="/become-host" className="hover:text-primary transition-colors">Host a dinner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Questions?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Get in touch</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Social Dine
          </div>
        </div>
      </footer>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout showHeader={false}><Home /></Layout>,
  },
  {
    path: '/listing/:id',
    element: <Layout><ListingDetail /></Layout>,
  },
  {
    path: '/host/:id',
    element: <Layout><HostProfile /></Layout>,
  },
  {
    path: '/bookings',
    element: <Layout><Bookings /></Layout>,
  },
  {
    path: '/become-host',
    element: <Layout><BecomeHost /></Layout>,
  },
  {
    path: '*',
    element: <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="serif text-3xl text-foreground mb-4">Can't find that page</h1>
        <a href="/" className="text-primary hover:underline">Go back home</a>
      </div>
    </Layout>,
  },
]);