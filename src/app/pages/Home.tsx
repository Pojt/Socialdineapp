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

  const cuisines = Array.from(new Set(dinnerExperiences.map(exp => exp.cuisine)));

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredExperiences = dinnerExperiences.filter(exp => {
    if (searchCity && !exp.host.city.toLowerCase().includes(searchCity.toLowerCase())) return false;
    if (searchDate && !exp.upcomingDates.includes(searchDate)) return false;
    if (guestCount && exp.seatsAvailable < Number(guestCount)) return false;
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(exp.cuisine)) return false;
    if (exp.pricePerPerson < priceRange[0] || exp.pricePerPerson > priceRange[1]) return false;
    if (exp.seatsAvailable < minSeats) return false;
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

  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* Search Bar */}
        <section className="bg-background border-b border-border/30 py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card shadow-lg border border-border hover:shadow-xl transition-shadow p-2 rounded-2xl md:rounded-full">
              <div className="flex flex-col md:grid md:grid-cols-12 gap-1 md:gap-2">
                {/* Where */}
                <div className="md:col-span-4">
                  <div className="px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-0.5 text-foreground">Where</label>
                    <input
                      type="text"
                      placeholder="Any city"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden md:block my-auto md:col-span-0">
                  <div className="w-px h-8 bg-border"></div>
                </div>
                <div className="block md:hidden h-px bg-border/50 mx-4"></div>

                {/* When */}
                <div className="md:col-span-3">
                  <div className="px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-0.5 text-foreground">When</label>
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden md:block my-auto md:col-span-0">
                  <div className="w-px h-8 bg-border"></div>
                </div>
                <div className="block md:hidden h-px bg-border/50 mx-4"></div>

                {/* Who + Search button on mobile */}
                <div className="md:col-span-4 flex items-center">
                  <div className="flex-1 px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors cursor-pointer">
                    <label className="block text-xs mb-0.5 text-foreground">Who</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Add guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  {/* Search button always visible */}
                  <div className="flex items-center justify-center pr-1">
                    <button className="w-11 h-11 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="serif text-4xl md:text-6xl text-foreground mb-5 leading-tight">
              Eat at a stranger's table
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Real people cooking real food — and you're invited. The meal is the excuse. The point is meeting someone new.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="serif text-2xl text-foreground">
              {searchCity ? `Dinners in ${searchCity}` : 'Upcoming dinners'}
              <span className="text-muted-foreground ml-2 text-xl">({filteredExperiences.length})</span>
            </h2>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">More filters</span>
              {(selectedCuisines.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || minSeats > 1) && (
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mb-8 p-5 bg-secondary/20 rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div>
                  <label className="block text-sm mb-3 text-foreground">
                    Price per person: ${priceRange[0]} – ${priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Min</label>
                      <input type="range" min="0" max="200" step="5" value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Max</label>
                      <input type="range" min="0" max="200" step="5" value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-3 text-foreground">
                    Seats available: {minSeats}+
                  </label>
                  <input type="range" min="1" max="12" step="1" value={minSeats}
                    onChange={(e) => setMinSeats(Number(e.target.value))}
                    className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span><span>12</span>
                  </div>
                </div>
              </div>

              {(selectedCuisines.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || minSeats > 1) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button onClick={() => { setSelectedCuisines([]); setPriceRange([0, 200]); setMinSeats(1); }}
                    className="text-sm text-primary hover:underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No dinners match your search.</p>
              <button onClick={clearFilters} className="text-primary hover:underline">Clear all filters</button>
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
        <section className="bg-secondary/20 py-14 md:py-20 mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="serif text-3xl md:text-4xl text-center text-foreground mb-10 md:mb-14">
              How it works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center serif text-lg mx-auto md:mx-0 mb-4">1</div>
                <h3 className="serif text-xl text-foreground mb-2">Browse people hosting</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Each listing is a real person opening their home. Read their story, see what they're cooking, get a feel for who they are.
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center serif text-lg mx-auto md:mx-0 mb-4">2</div>
                <h3 className="serif text-xl text-foreground mb-2">Send a request</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Pick a date and send a short note. The host sees who you are before confirming — it works both ways.
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center serif text-lg mx-auto md:mx-0 mb-4">3</div>
                <h3 className="serif text-xl text-foreground mb-2">Show up and eat</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Once confirmed you get the address. Bring an appetite and a willingness to talk to someone you've never met.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Host CTA */}
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="serif text-3xl md:text-4xl text-foreground mb-4">
              Like to cook for people?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If you've got a table and something good to make, you could be hosting this week.
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
