import { useParams, Link } from 'react-router';
import { MapPin, Users } from 'lucide-react';
import { dinnerExperiences, reviews } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export function ListingDetail() {
  const { id } = useParams();
  const experience = dinnerExperiences.find(exp => exp.id === id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const bookingRef = useRef<HTMLDivElement>(null);

  if (!experience) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="serif text-2xl mb-4">Can't find that dinner</h2>
        <Link to="/" className="text-primary hover:underline">Browse all dinners</Link>
      </div>
    );
  }

  const hostReviews = reviews[experience.host.id] || [];
  const totalPrice = experience.pricePerPerson * guestCount;

  const handleRequest = () => {
    if (!selectedDate) {
      toast.error('Pick a date first');
      return;
    }
    toast.success(`Request sent to ${experience.host.name}. They'll get back to you soon.`);
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 lg:pb-12">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* Host intro */}
            <div>
              <div className="flex items-start gap-4 mb-5">
                <img
                  src={experience.host.avatar}
                  alt={experience.host.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-border flex-shrink-0"
                />
                <div>
                  <h1 className="serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 leading-snug">
                    {experience.invitation}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{experience.host.city}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-2 mb-4">
                {experience.host.interests.map((interest) => (
                  <span key={interest} className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-full">
                    {interest}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground italic mb-3 text-sm">
                "{experience.host.oneLiner}"
              </p>
              <p className="text-foreground leading-relaxed">
                {experience.host.story}
              </p>
            </div>

            {/* Table info strip */}
            <div className="flex flex-wrap gap-4 py-4 border-y border-border/40 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{experience.seatsAvailable} seats at the table</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/60 inline-block"></span>
                <span>{experience.tableVibe}</span>
              </div>
            </div>

            {/* Food photo */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src={experience.image}
                alt={experience.dishDescription}
                className="w-full h-full object-cover"
              />
            </div>

            {/* The evening */}
            <div>
              <h2 className="serif text-2xl text-foreground mb-4">The evening</h2>
              <p className="text-foreground mb-4">{experience.dishDescription}</p>
              <ul className="space-y-2">
                {experience.whatToExpect.map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dietary notes */}
            {experience.dietaryNotes && (
              <div className="bg-secondary/30 p-4 rounded-lg text-sm text-foreground">
                <span className="font-medium">Dietary notes: </span>
                {experience.dietaryNotes}
              </div>
            )}

            {/* Trust note */}
            <div className="bg-secondary/20 border border-border/40 rounded-lg p-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-medium">How this works: </span>
                {experience.host.name} reviews your request before confirming. Once accepted, you'll get the address and can message each other directly before the dinner.
              </p>
            </div>

            {/* Reviews */}
            {hostReviews.length > 0 && (
              <div>
                <h2 className="serif text-2xl text-foreground mb-6">What people said</h2>
                <div className="space-y-5">
                  {hostReviews.map((review, index) => (
                    <div key={index} className="border-l-2 border-border pl-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.guestAvatar}
                          alt={review.guestName}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-foreground text-sm">{review.guestName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar — desktop */}
          <div className="lg:col-span-2" ref={bookingRef}>
            <div className="bg-card border border-border rounded-lg p-6 lg:sticky lg:top-24 space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="serif text-3xl text-foreground">${experience.pricePerPerson}</span>
                  <span className="text-muted-foreground">per person</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {experience.seatsAvailable} seats available · {experience.tableVibe}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pick a date</label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Choose..." />
                    </SelectTrigger>
                    <SelectContent>
                      {experience.upcomingDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">How many people?</label>
                  <Select value={guestCount.toString()} onValueChange={(val) => setGuestCount(Number(val))}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: Math.min(experience.seatsAvailable, 8) }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">${experience.pricePerPerson} × {guestCount}</span>
                  <span className="text-foreground">${totalPrice}</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleRequest}
              >
                Request to join
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {experience.host.name} will confirm before anything is charged
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border px-4 py-3 flex items-center justify-between z-50 gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="serif text-xl text-foreground">${experience.pricePerPerson}</span>
            <span className="text-xs text-muted-foreground">/ person</span>
          </div>
          <p className="text-xs text-muted-foreground">{experience.seatsAvailable} seats left</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
          onClick={scrollToBooking}
        >
          Request to join
        </Button>
      </div>
    </>
  );
}
