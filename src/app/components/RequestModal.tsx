import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { currentUser } from '../data/mockData';
import { toast } from 'sonner';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  hostName: string;
  date: string;
  guestCount: number;
  totalPrice: number;
}

export function RequestModal({ open, onClose, hostName, date, guestCount, totalPrice }: RequestModalProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error('Add a short note so ' + hostName + ' knows who you are');
      return;
    }
    toast.success(`Request sent to ${hostName}. They'll get back to you soon.`);
    setMessage('');
    onClose();
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="serif text-2xl">
            Introduce yourself to {hostName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Who's asking */}
          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {currentUser.interests.join(' · ')}
              </p>
            </div>
          </div>

          {/* Booking summary */}
          <div className="text-sm text-muted-foreground space-y-1 border-l-2 border-border pl-3">
            <p>{formattedDate}</p>
            <p>{guestCount} {guestCount === 1 ? 'person' : 'people'} · ${totalPrice} total</p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Say hello
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Tell ${hostName} a little about yourself — who you are, why this dinner caught your eye...`}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {hostName} will review your request before confirming.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSubmit}
            >
              Send request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
