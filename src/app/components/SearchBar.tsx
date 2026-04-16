import { Search, MapPin, Users, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="bg-white rounded-full shadow-lg border p-2 flex items-center gap-2 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 px-4 flex-1 border-r">
        <MapPin className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Location" 
          className="border-0 focus-visible:ring-0 p-0"
        />
      </div>
      
      <div className="flex items-center gap-2 px-4 flex-1 border-r">
        <Calendar className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Date" 
          type="date"
          className="border-0 focus-visible:ring-0 p-0"
        />
      </div>
      
      <div className="flex items-center gap-2 px-4 flex-1 border-r">
        <Users className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Guests" 
          type="number"
          className="border-0 focus-visible:ring-0 p-0"
        />
      </div>

      <div className="flex items-center gap-2 px-4 flex-1">
        <Search className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Cuisine" 
          className="border-0 focus-visible:ring-0 p-0"
        />
      </div>
      
      <Button size="icon" className="rounded-full bg-orange-500 hover:bg-orange-600 shrink-0">
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}
