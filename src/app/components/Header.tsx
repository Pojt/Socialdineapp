import { Link } from 'react-router';
import { Calendar, User, Search } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  searchMode?: boolean;
  searchCity?: string;
  searchDate?: string;
  guestCount?: string;
  onSearchCityChange?: (value: string) => void;
  onSearchDateChange?: (value: string) => void;
  onGuestCountChange?: (value: string) => void;
}

export function Header({ 
  searchMode = false,
  searchCity = '',
  searchDate = '',
  guestCount = '',
  onSearchCityChange,
  onSearchDateChange,
  onGuestCountChange
}: HeaderProps) {
  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          <Link to="/" className="serif text-2xl text-primary flex-shrink-0">
            Social Dine
          </Link>

          {/* Airbnb-style Search Bar (shown on home page) */}
          {searchMode && (
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="w-full bg-card rounded-full shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-12 items-center">
                  {/* Where */}
                  <div className="col-span-4 px-5 py-2 border-r border-border">
                    <label className="block text-xs mb-0.5 text-foreground">Where</label>
                    <input
                      type="text"
                      placeholder="Any city"
                      value={searchCity}
                      onChange={(e) => onSearchCityChange?.(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>

                  {/* When */}
                  <div className="col-span-3 px-5 py-2 border-r border-border">
                    <label className="block text-xs mb-0.5 text-foreground">When</label>
                    <input
                      type="date"
                      placeholder="Add date"
                      value={searchDate}
                      onChange={(e) => onSearchDateChange?.(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>

                  {/* Who */}
                  <div className="col-span-4 px-5 py-2">
                    <label className="block text-xs mb-0.5 text-foreground">Who</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Add guests"
                      value={guestCount}
                      onChange={(e) => onGuestCountChange?.(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>

                  {/* Search Button */}
                  <div className="col-span-1 flex items-center justify-center pr-2">
                    <button className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Browse dinners
            </Link>
            <Link to="/become-host" className="text-sm hover:text-primary transition-colors">
              Host a dinner
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/bookings">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}