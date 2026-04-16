import { Link } from 'react-router';
import { Star, Users, Clock, MapPin } from 'lucide-react';
import { DinnerExperience } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ListingCardProps {
  experience: DinnerExperience;
}

export function ListingCard({ experience }: ListingCardProps) {
  return (
    <Link to={`/listing/${experience.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={experience.image} 
            alt={experience.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-white text-black hover:bg-white">
            {experience.cuisine}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold line-clamp-1">{experience.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {experience.location.neighborhood}, {experience.location.city}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {experience.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Up to {experience.maxGuests}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {experience.duration}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{experience.rating}</span>
              <span className="text-sm text-gray-600">({experience.reviewCount})</span>
            </div>
            <div>
              <span className="text-lg font-semibold">${experience.price}</span>
              <span className="text-sm text-gray-600"> / person</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t flex items-center gap-2">
            <img 
              src={experience.host.avatar} 
              alt={experience.host.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">Hosted by {experience.host.name}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
