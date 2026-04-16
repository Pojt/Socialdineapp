import { Link } from 'react-router';
import { DinnerExperience } from '../data/mockData';

interface DinnerCardProps {
  experience: DinnerExperience;
}

export function DinnerCard({ experience }: DinnerCardProps) {
  return (
    <Link to={`/listing/${experience.id}`} className="block group">
      <div className="space-y-3">
        {/* Host — leading element */}
        <div className="flex items-center gap-3 mb-1">
          <img
            src={experience.host.avatar}
            alt={experience.host.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="serif text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
              {experience.host.name}
            </h3>
            <p className="text-xs text-muted-foreground">{experience.host.city}</p>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5">
          {experience.host.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Food photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={experience.image}
            alt={experience.dishDescription}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Vibe tag */}
          <span className="absolute bottom-2 left-2 text-xs px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground rounded-full">
            {experience.tableVibe}
          </span>
        </div>

        {/* One-liner */}
        <p className="text-sm text-foreground leading-relaxed">
          {experience.host.oneLiner}
        </p>

        {/* Price and seats */}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-border/30">
          <span className="text-muted-foreground">
            {experience.seatsAvailable} {experience.seatsAvailable === 1 ? 'seat' : 'seats'} left
          </span>
          <span className="text-foreground font-medium">
            ${experience.pricePerPerson} <span className="text-muted-foreground font-normal">/ person</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
