import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, Users, MapPin } from 'lucide-react';
import { mockBookings, dinnerExperiences } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ReviewModal } from '../components/ReviewModal';
import { PageTransition } from '../components/PageTransition';

export function Bookings() {
  const [reviewTarget, setReviewTarget] = useState<{ hostName: string; hostAvatar: string } | null>(null);

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const pendingBookings = mockBookings.filter(b => b.status === 'pending');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');

  const getExperience = (experienceId: string) =>
    dinnerExperiences.find(exp => exp.id === experienceId);

  const BookingCard = ({
    booking,
    variant = 'default',
  }: {
    booking: typeof mockBookings[0];
    variant?: 'default' | 'pending' | 'past';
  }) => {
    const experience = getExperience(booking.experienceId);
    if (!experience) return null;

    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <img
              src={experience.host.avatar}
              alt={experience.host.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-border flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="serif text-xl text-foreground leading-tight">
                    {experience.host.name}'s dinner
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{experience.dishDescription}</p>
                </div>
                {variant === 'pending' && (
                  <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex-shrink-0">
                    Awaiting confirmation
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>{experience.host.city}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs text-muted-foreground">Total</span>
                  <p className="serif text-xl text-foreground">${booking.totalPrice}</p>
                </div>
                <div className="flex items-center gap-3">
                  {variant === 'past' && (
                    <button
                      onClick={() => setReviewTarget({ hostName: experience.host.name, hostAvatar: experience.host.avatar })}
                      className="text-sm text-primary hover:underline"
                    >
                      Leave a review
                    </button>
                  )}
                  <Link to={`/listing/${experience.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    View dinner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="serif text-3xl md:text-4xl text-foreground mb-8">Your dinners</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 bg-secondary/30 w-full sm:w-auto">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-card flex-1 sm:flex-none">
              Coming up ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-card flex-1 sm:flex-none">
              Pending
              {pendingBookings.length > 0 && (
                <span className="ml-1.5 w-2 h-2 rounded-full bg-amber-500 inline-block" />
              )}
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-card flex-1 sm:flex-none">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-5">
            {upcomingBookings.length === 0 ? (
              <div className="bg-secondary/20 rounded-lg p-12 text-center">
                <Calendar className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="serif text-2xl text-foreground mb-2">Nothing planned yet</h3>
                <p className="text-muted-foreground mb-6 text-sm">Find a dinner and request a seat</p>
                <Link to="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  Browse dinners
                </Link>
              </div>
            ) : (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} variant="default" />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-5">
            {pendingBookings.length === 0 ? (
              <div className="bg-secondary/20 rounded-lg p-12 text-center">
                <p className="text-muted-foreground text-sm">No pending requests right now</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Waiting for the host to confirm your request.
                </p>
                {pendingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} variant="pending" />
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-5">
            {pastBookings.length === 0 ? (
              <div className="bg-secondary/20 rounded-lg p-12 text-center">
                <p className="text-muted-foreground text-sm">Dinners you've attended will show up here</p>
              </div>
            ) : (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} variant="past" />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {reviewTarget && (
        <ReviewModal
          open={true}
          onClose={() => setReviewTarget(null)}
          hostName={reviewTarget.hostName}
          hostAvatar={reviewTarget.hostAvatar}
        />
      )}
    </PageTransition>
  );
}
