import { Link } from 'react-router';
import { DinnerExperience } from '../data/mockData';

interface DinnerCardProps {
  experience: DinnerExperience;
}

export function DinnerCard({ experience }: DinnerCardProps) {
  return (
    <Link to={`/listing/${experience.id}`} className="block group">
      <div className="space-y-3">
        {/* Host Photo - Leading element */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={experience.host.avatar} 
            alt={experience.host.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <h3 className="serif text-xl text-foreground group-hover:text-primary transition-colors">
              {experience.host.name}
            </h3>
            <p className="text-sm text-muted-foreground">{experience.host.city}</p>
          </div>
        </div>

        {/* Dish Photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <img 
            src={experience.image} 
            alt={experience.dishDescription}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* One liner about host */}
        <p className="text-sm text-foreground leading-relaxed">
          {experience.host.oneLiner}
        </p>

        {/* What they're cooking */}
        <p className="text-sm text-muted-foreground">
          {experience.dishDescription}
        </p>

        {/* Price and seats - subtle */}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-border/30">
          <span className="text-muted-foreground">
            {experience.seatsAvailable} {experience.seatsAvailable === 1 ? 'seat' : 'seats'}
          </span>
          <span className="text-foreground font-medium">
            ${experience.pricePerPerson}
          </span>
        </div>
      </div>
    </Link>
  );
}
