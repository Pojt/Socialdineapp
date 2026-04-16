import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  hostName: string;
  hostAvatar: string;
}

export function ReviewModal({ open, onClose, hostName, hostAvatar }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Add a star rating first');
      return;
    }
    if (!comment.trim()) {
      toast.error('Add a short comment');
      return;
    }
    toast.success('Review posted — thanks for sharing');
    setRating(0);
    setComment('');
    onClose();
  };

  const labels: Record<number, string> = {
    1: 'Not for me',
    2: 'It was okay',
    3: 'Good evening',
    4: 'Really enjoyed it',
    5: 'One of those nights',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <img
              src={hostAvatar}
              alt={hostName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <DialogTitle className="serif text-2xl">
              How was {hostName}'s dinner?
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Star rating */}
          <div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`${star} star`}
                >
                  <span className={(hovered || rating) >= star ? 'text-primary' : 'text-border'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            {(hovered || rating) > 0 && (
              <p className="text-xs text-muted-foreground">
                {labels[hovered || rating]}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tell future guests what it was like
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="The food, the conversation, the vibe — what would you tell a friend?"
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Maybe later
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSubmit}
            >
              Post review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
