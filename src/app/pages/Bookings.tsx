import { Link } from 'react-router';
import { Calendar, Users, MapPin } from 'lucide-react';
import { mockBookings, dinnerExperiences } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Bookings() {
  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');

  const getExperience = (experienceId: string) => {
    return dinnerExperiences.find(exp => exp.id === experienceId);
  };

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const experience = getExperience(booking.experienceId);
    if (!experience) return null;

    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src={experience.host.avatar} 
                alt={experience.host.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
              />
              <div>
                <h3 className="serif text-2xl text-foreground">
                  {experience.host.name}'s dinner
                </h3>
                <p className="text-muted-foreground">{experience.dishDescription}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center gap-2 text-foreground">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</span>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{experience.host.city}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="serif text-2xl text-foreground">${booking.totalPrice}</p>
            </div>
            <Link 
              to={`/listing/${experience.id}`}
              className="text-sm text-primary hover:underline"
            >
              View dinner
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="serif text-3xl md:text-4xl text-foreground mb-8">Your dinners</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-8 bg-secondary/30">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-card">
            Coming up ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-card">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingBookings.length === 0 ? (
            <div className="bg-secondary/20 rounded-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="serif text-2xl text-foreground mb-2">Nothing planned yet</h3>
              <p className="text-muted-foreground mb-6">
                Find a dinner and request a seat
              </p>
              <Link 
                to="/"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse dinners
              </Link>
            </div>
          ) : (
            upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastBookings.length === 0 ? (
            <div className="bg-secondary/20 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">
                Dinners you've attended will show up here
              </p>
            </div>
          ) : (
            pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
