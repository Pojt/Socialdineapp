import { Link } from 'react-router';
import { MapPin, UtensilsCrossed, Edit3 } from 'lucide-react';
import { currentUser, mockBookings, dinnerExperiences } from '../data/mockData';
import { Button } from '../components/ui/button';
import { PageTransition } from '../components/PageTransition';

export function GuestProfile() {
  const pastDinners = mockBookings
    .filter(b => b.status === 'completed')
    .map(b => ({ booking: b, experience: dinnerExperiences.find(e => e.id === b.experienceId) }))
    .filter(({ experience }) => experience != null);

  const pendingRequests = mockBookings
    .filter(b => b.status === 'pending')
    .map(b => ({ booking: b, experience: dinnerExperiences.find(e => e.id === b.experienceId) }))
    .filter(({ experience }) => experience != null);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Profile header */}
        <div className="flex items-start gap-5 mb-10">
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-border"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="serif text-2xl sm:text-3xl text-foreground mb-1">{currentUser.name}</h1>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{currentUser.city}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex-shrink-0 gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit profile</span>
              </Button>
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-3">
              {currentUser.oneLiner}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.interests.map(interest => (
                <span key={interest} className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-10 p-5 bg-secondary/20 rounded-lg border border-border/40">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <UtensilsCrossed className="w-4 h-4 text-primary" />
              <span className="serif text-2xl text-foreground">{currentUser.dinnersAttended}</span>
            </div>
            <p className="text-xs text-muted-foreground">dinners attended</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="serif text-2xl text-foreground">{pendingRequests.length}</span>
            </div>
            <p className="text-xs text-muted-foreground">pending {pendingRequests.length === 1 ? 'request' : 'requests'}</p>
          </div>
        </div>

        {/* Pending requests */}
        {pendingRequests.length > 0 && (
          <section className="mb-10">
            <h2 className="serif text-xl text-foreground mb-4">Waiting to hear back</h2>
            <div className="space-y-3">
              {pendingRequests.map(({ booking, experience }) => (
                experience && (
                  <div key={booking.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                    <img
                      src={experience.host.avatar}
                      alt={experience.host.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{experience.host.name}'s dinner</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {' · '}{booking.guests} {booking.guests === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex-shrink-0">
                      Pending
                    </span>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Past dinners */}
        <section className="mb-10">
          <h2 className="serif text-xl text-foreground mb-4">Dinners attended</h2>
          {pastDinners.length === 0 ? (
            <div className="text-center py-10 bg-secondary/20 rounded-lg">
              <p className="text-muted-foreground text-sm mb-3">No dinners yet</p>
              <Link to="/" className="text-primary text-sm hover:underline">Browse dinners</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {pastDinners.map(({ booking, experience }) => (
                experience && (
                  <Link
                    key={booking.id}
                    to={`/listing/${experience.id}`}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <img
                      src={experience.image}
                      alt={experience.host.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {experience.host.name}'s dinner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        {' · '}{experience.host.city}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">${booking.totalPrice}</span>
                  </Link>
                )
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="bg-secondary/20 rounded-lg p-6 text-center border border-border/40">
          <p className="text-foreground serif text-lg mb-2">Ready for your next dinner?</p>
          <p className="text-sm text-muted-foreground mb-4">Browse people hosting near you this week.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Find a dinner
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
