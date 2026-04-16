import { useParams, Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { dinnerExperiences, reviews } from '../data/mockData';
import { DinnerCard } from '../components/DinnerCard';

export function HostProfile() {
  const { id } = useParams();
  
  const hostExperiences = dinnerExperiences.filter(exp => exp.host.id === id);
  const host = hostExperiences[0]?.host;
  const hostReviews = reviews[id] || [];

  if (!host) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="serif text-2xl mb-4">Can't find that host</h2>
        <Link to="/" className="text-primary hover:underline">
          Browse all dinners
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Host Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <img 
            src={host.avatar} 
            alt={host.name}
            className="w-32 h-32 rounded-full object-cover ring-2 ring-border"
          />
          
          <div className="flex-1">
            <h1 className="serif text-4xl text-foreground mb-3">{host.name}</h1>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{host.city}</span>
            </div>

            <p className="text-muted-foreground italic mb-4">
              "{host.oneLiner}"
            </p>

            <p className="text-foreground leading-relaxed max-w-2xl">
              {host.story}
            </p>
          </div>
        </div>
      </div>

      {/* Host's Dinners */}
      <div className="mb-12">
        <h2 className="serif text-2xl text-foreground mb-6">
          {host.name}'s dinners
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostExperiences.map((experience) => (
            <DinnerCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      {hostReviews.length > 0 && (
        <div>
          <h2 className="serif text-2xl text-foreground mb-6">
            What people said
          </h2>
          
          <div className="space-y-6">
            {hostReviews.map((review, index) => (
              <div key={index} className="border-l-2 border-border pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={review.guestAvatar} 
                    alt={review.guestName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{review.guestName}</p>
                    <p className="text-sm text-muted-foreground">
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
  );
}
