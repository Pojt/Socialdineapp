import { useState } from 'react';
import { DinnerCard } from '../components/DinnerCard';
import { dinnerExperiences } from '../data/mockData';
import { Header } from '../components/Header';
import { Filter, ChevronDown, Search } from 'lucide-react';

export function Home() {
  const [searchCity, setSearchCity] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minSeats, setMinSeats] = useState<number>(1);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique cuisines from data
  const cuisines = Array.from(new Set(dinnerExperiences.map(exp => exp.cuisine)));

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredExperiences = dinnerExperiences.filter(exp => {
    // City filter
    if (searchCity && !exp.host.city.toLowerCase().includes(searchCity.toLowerCase())) {
      return false;
    }

    // Date filter
    if (searchDate && !exp.upcomingDates.includes(searchDate)) {
      return false;
    }

    // Guest count filter
    if (guestCount && exp.seatsAvailable < Number(guestCount)) {
      return false;
    }
    
    // Cuisine filter
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(exp.cuisine)) {
      return false;
    }
    
    // Price range filter
    if (exp.pricePerPerson < priceRange[0] || exp.pricePerPerson > priceRange[1]) {
      return false;
    }
    
    // Seats filter
    if (exp.seatsAvailable < minSeats) {
      return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setSearchCity('');
    setSearchDate('');
    setGuestCount('');
    setSelectedCuisines([]);
    setPriceRange([0, 200]);
    setMinSeats(1);
  };

  const hasActiveFilters = searchCity || searchDate || guestCount || 
    selectedCuisines.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || minSeats > 1;

  return (
    <>
      <Header />
      
      <div className="min-h-screen">
        {/* Search Bar Section */}
        <section className="bg-background border-b border-border/30 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-full shadow-lg border border-border hover:shadow-xl transition-shadow p-2">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                {/* Where */}
                <div className="md:col-span-4 relative">
                  <div className="px-6 py-3 hover:bg-secondary/30 rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-1 text-foreground">Where</label>
                    <input
                      type="text"
                      placeholder="Any city"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block md:col-span-0 my-auto">
                  <div className="w-px h-8 bg-border"></div>
                </div>

                {/* When */}
                <div className="md:col-span-3 relative">
                  <div className="px-6 py-3 hover:bg-secondary/30 rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-1 text-foreground">When</label>
                    <input
                      type="date"
                      placeholder="Add date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block md:col-span-0 my-auto">
                  <div className="w-px h-8 bg-border"></div>
                </div>

                {/* Who */}
                <div className="md:col-span-3 relative">
                  <div className="px-6 py-3 hover:bg-secondary/30 rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-1 text-foreground">Who</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Add guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1 flex items-center justify-center">
                  <button className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="serif text-4xl md:text-6xl text-foreground mb-6 leading-tight text-center">
              Dinner at someone's home
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center">
              Real people cooking the food they grew up with. Pull up a chair, meet your neighbors, eat something made with care.
            </p>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="serif text-2xl text-foreground">
              {searchCity ? `Dinners in ${searchCity}` : 'Upcoming dinners'}
              <span className="text-muted-foreground ml-2">({filteredExperiences.length})</span>
            </h2>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>More filters</span>
              {(selectedCuisines.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || minSeats > 1) && (
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-secondary/20 rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm mb-3 text-foreground">Cuisine</label>
                  <div className="space-y-2">
                    {cuisines.map(cuisine => (
                      <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCuisines.includes(cuisine)}
                          onChange={() => toggleCuisine(cuisine)}
                          className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm text-muted-foreground">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm mb-3 text-foreground">
                    Price per person: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Min</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Max</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Seats Filter */}
                <div>
                  <label className="block text-sm mb-3 text-foreground">
                    Seats available: {minSeats}+
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={minSeats}
                    onChange={(e) => setMinSeats(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>12</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCuisines.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || minSeats > 1) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setSelectedCuisines([]);
                      setPriceRange([0, 200]);
                      setMinSeats(1);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No dinners match your search.
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredExperiences.map((experience) => (
                <DinnerCard key={experience.id} experience={experience} />
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="bg-secondary/20 py-16 md:py-20 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="serif text-3xl md:text-4xl text-center text-foreground mb-12">
              How this works
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="serif text-xl text-foreground mb-2">Find someone cooking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse home cooks in your city. They're not chefs — just people who love to cook and want to share a meal.
                </p>
              </div>

              <div>
                <h3 className="serif text-xl text-foreground mb-2">Request a seat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pick a date that works for you. They'll confirm, and you'll get the address and any details you need.
                </p>
              </div>

              <div>
                <h3 className="serif text-xl text-foreground mb-2">Show up hungry</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bring yourself and an appetite. You'll eat well, meet interesting people, and probably leave with leftovers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Host CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="serif text-3xl md:text-4xl text-foreground mb-4">
              Like to cook?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If you've got a table and something good to make, you could host a dinner. 
              We'll help you fill the seats.
            </p>
            <a 
              href="/become-host" 
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tell us about your dinner
            </a>
          </div>
        </section>
      </div>
    </>
  );
}