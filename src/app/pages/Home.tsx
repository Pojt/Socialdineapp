import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { DinnerCard } from '../components/DinnerCard';
import { DinnerCardSkeleton } from '../components/DinnerCardSkeleton';
import { PageTransition } from '../components/PageTransition';
import { dinnerExperiences } from '../data/mockData';
import { Header } from '../components/Header';
import { Filter, ChevronDown, Search } from 'lucide-react';

const TODAY = '2026-04-16';
const WEEK_OUT = '2026-04-22';

export function Home() {
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minSeats, setMinSeats] = useState<number>(1);
  const [soloOnly, setSoloOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const cuisines = Array.from(new Set(dinnerExperiences.map(exp => exp.cuisine)));

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const thisWeek = dinnerExperiences.filter(exp =>
    exp.upcomingDates.some(d => d >= TODAY && d <= WEEK_OUT)
  );

  const filteredExperiences = dinnerExperiences.filter(exp => {
    if (searchCity && !exp.host.city.toLowerCase().includes(searchCity.toLowerCase())) return false;
    if (searchDate && !exp.upcomingDates.includes(searchDate)) return false;
    if (guestCount && exp.seatsAvailable < Number(guestCount)) return false;
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(exp.cuisine)) return false;
    if (exp.pricePerPerson < priceRange[0] || exp.pricePerPerson > priceRange[1]) return false;
    if (exp.seatsAvailable < minSeats) return false;
    if (soloOnly && !exp.soloFriendly) return false;
    return true;
  });

  const clearFilters = () => {
    setSearchCity('');
    setSearchDate('');
    setGuestCount('');
    setSelectedCuisines([]);
    setPriceRange([0, 200]);
    setMinSeats(1);
    setSoloOnly(false);
  };

  const hasActiveFilters = selectedCuisines.length > 0 || priceRange[0] > 0 ||
    priceRange[1] < 200 || minSeats > 1 || soloOnly;

  return (
    <>
      <Header />
      <PageTransition>
        <div className="min-h-screen">

          {/* Search Bar */}
          <section className="bg-background border-b border-border/30 py-4 sm:py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-card shadow-lg border border-border hover:shadow-xl transition-shadow p-2 rounded-2xl md:rounded-full">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-1 md:gap-2">
                  <div className="md:col-span-4">
                    <div className="px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors">
                      <label className="block text-xs mb-0.5 text-foreground">Where</label>
                      <input type="text" placeholder="Any city" value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" />
                    </div>
                  </div>
                  <div className="hidden md:block my-auto"><div className="w-px h-8 bg-border" /></div>
                  <div className="block md:hidden h-px bg-border/50 mx-4" />
                  <div className="md:col-span-3">
                    <div className="px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors">
                      <label className="block text-xs mb-0.5 text-foreground">When</label>
                      <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
                        className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" />
                    </div>
                  </div>
                  <div className="hidden md:block my-auto"><div className="w-px h-8 bg-border" /></div>
                  <div className="block md:hidden h-px bg-border/50 mx-4" />
                  <div className="md:col-span-4 flex items-center">
                    <div className="flex-1 px-4 py-2.5 hover:bg-secondary/30 rounded-xl md:rounded-full transition-colors">
                      <label className="block text-xs mb-0.5 text-foreground">Who</label>
                      <input type="number" min="1" placeholder="Add guests" value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full border-0 p-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" />
                    </div>
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

          {/* This week */}
          {!loading && thisWeek.length > 0 && !searchCity && !searchDate && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <h2 className="serif text-2xl text-foreground mb-5">Happening this week</h2>
              <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
                {thisWeek.map((experience) => (
                  <div key={experience.id} className="w-64 sm:w-72 flex-shrink-0 snap-start">
                    <DinnerCard experience={experience} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All listings */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="serif text-2xl text-foreground">
                {searchCity ? `Dinners in ${searchCity}` : 'All upcoming dinners'}
                <span className="text-muted-foreground ml-2 text-xl">({filteredExperiences.length})</span>
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-sm"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showFilters && (
              <div className="mb-8 p-5 bg-secondary/20 rounded-lg border border-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cuisine */}
                  <div>
                    <label className="block text-sm mb-3 text-foreground">Cuisine</label>
                    <div className="flex flex-wrap gap-2">
                      {cuisines.map(cuisine => (
                        <button
                          key={cuisine}
                          onClick={() => toggleCuisine(cuisine)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                            selectedCuisines.includes(cuisine)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm mb-3 text-foreground">
                      Price: ${priceRange[0]} – ${priceRange[1]} per person
                    </label>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Min</span>
                        <input type="range" min="0" max="200" step="5" value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Max</span>
                        <input type="range" min="0" max="200" step="5" value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Seats + Solo toggle */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm mb-3 text-foreground">Seats: {minSeats}+</label>
                      <input type="range" min="1" max="12" step="1" value={minSeats}
                        onChange={(e) => setMinSeats(Number(e.target.value))}
                        className="w-full" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1</span><span>12</span>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setSoloOnly(!soloOnly)}
                        className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 ${soloOnly ? 'bg-primary' : 'bg-border'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white mt-1 transition-transform mx-1 ${soloOnly ? 'translate-x-4' : ''}`} />
                      </div>
                      <span className="text-sm text-foreground">Going solo? Show solo-friendly only</span>
                    </label>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="pt-4 border-t border-border">
                    <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {Array.from({ length: 6 }).map((_, i) => <DinnerCardSkeleton key={i} />)}
              </div>
            ) : filteredExperiences.length === 0 ? (
              <div className="text-center py-16 bg-secondary/10 rounded-xl border border-border/40">
                <p className="serif text-2xl text-foreground mb-2">No dinners match</p>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                  Try a different city, date, or remove some filters.
                </p>
                <button onClick={clearFilters} className="text-sm text-primary hover:underline">
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
          <section className="bg-secondary/20 py-14 md:py-20 mt-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="serif text-3xl md:text-4xl text-center text-foreground mb-10 md:mb-14">
                How it works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    n: '1',
                    title: 'Browse people hosting',
                    body: 'Each listing is a real person opening their home. Read their story, see what they\'re cooking, get a feel for who they are.',
                  },
                  {
                    n: '2',
                    title: 'Send a request',
                    body: 'Pick a date and send a short note. The host sees who you are before confirming — it works both ways.',
                  },
                  {
                    n: '3',
                    title: 'Show up and eat',
                    body: 'Once confirmed you get the address. Bring an appetite and a willingness to talk to someone you\'ve never met.',
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="text-center md:text-left">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center serif text-lg mx-auto md:mx-0 mb-4">
                      {n}
                    </div>
                    <h3 className="serif text-xl text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Host CTA */}
          <section className="py-14 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="serif text-3xl md:text-4xl text-foreground mb-4">Like to cook for people?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                If you've got a table and something good to make, you could be hosting this week.
              </p>
              <Link
                to="/become-host"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Tell us about your dinner
              </Link>
            </div>
          </section>

        </div>
      </PageTransition>
    </>
  );
}
