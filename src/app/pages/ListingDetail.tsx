import { useParams, Link } from 'react-router';
import { MapPin, Calendar, Users } from 'lucide-react';
import { dinnerExperiences, reviews } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

export function ListingDetail() {
  const { id } = useParams();
  const experience = dinnerExperiences.find(exp => exp.id === id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);

  if (!experience) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="serif text-2xl mb-4">Can't find that dinner</h2>
        <Link to="/" className="text-primary hover:underline">
          Browse all dinners
        </Link>
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Host intro */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <img 
                src={experience.host.avatar} 
                alt={experience.host.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-border"
              />
              <div>
                <h1 className="serif text-3xl md:text-4xl text-foreground mb-2">
                  {experience.invitation}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.host.city}</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground italic mb-3">
              "{experience.host.oneLiner}"
            </p>

            <p className="text-foreground leading-relaxed">
              {experience.host.story}
            </p>
          </div>

          {/* Dish Photo */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <img 
              src={experience.image} 
              alt={experience.dishDescription}
              className="w-full h-full object-cover"
            />
          </div>

          {/* What they're making */}
          <div>
            <h2 className="serif text-2xl text-foreground mb-4">
              What we'll eat
            </h2>
            <p className="text-foreground mb-4">{experience.dishDescription}</p>
            <ul className="space-y-2">
              {experience.whatToExpect.map((item, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dietary notes */}
          {experience.dietaryNotes && (
            <div className="bg-secondary/30 p-4 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-medium">Dietary notes: </span>
                {experience.dietaryNotes}
              </p>
            </div>
          )}

          {/* Reviews */}
          {hostReviews.length > 0 && (
            <div>
              <h2 className="serif text-2xl text-foreground mb-6">
                What people said
              </h2>
              <div className="space-y-4">
                {hostReviews.map((review, index) => (
                  <div key={index} className="border-l-2 border-border pl-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={review.guestAvatar} 
                        alt={review.guestName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{review.guestName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="serif text-3xl text-foreground">${experience.pricePerPerson}</span>
                <span className="text-muted-foreground">per person</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {experience.seatsAvailable} seats available
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pick a date
                </label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                  <SelectContent>
                    {experience.upcomingDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  How many people?
                </label>
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
                <span className="text-muted-foreground">
                  ${experience.pricePerPerson} × {guestCount}
                </span>
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
              {experience.host.name} will confirm your request
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
