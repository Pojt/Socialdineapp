import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function BecomeHost() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Got it. We\'ll email you within a few days.');
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="serif text-3xl md:text-4xl text-foreground mb-3">Tell us about your dinner</h1>
          <p className="text-muted-foreground">
            Just the basics for now. We\'ll follow up with questions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="serif text-xl text-foreground">About you</h2>
            
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" placeholder="Just first name is fine" required className="mt-2" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="mt-2" />
            </div>

            <div>
              <Label htmlFor="city">Where are you?</Label>
              <Input id="city" placeholder="City name" required className="mt-2" />
            </div>

            <div>
              <Label htmlFor="story">Tell us a bit about yourself</Label>
              <Textarea 
                id="story" 
                placeholder="Where you\'re from, how you got into cooking, what kind of food you make..." 
                rows={4}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="serif text-xl text-foreground">Your dinner</h2>
            
            <div>
              <Label htmlFor="dish">What would you cook?</Label>
              <Input 
                id="dish" 
                placeholder="e.g., My grandmother\'s curry" 
                required 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Describe the meal</Label>
              <Textarea 
                id="description" 
                placeholder="What you\'d serve, how the evening would go..." 
                rows={4}
                required
                className="mt-2"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">How much per person?</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="50" 
                    min="1"
                    required 
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="seats">How many people?</Label>
                <Input 
                  id="seats" 
                  type="number" 
                  placeholder="6" 
                  min="2"
                  max="20"
                  required 
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Send it
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Host a dinner at your place
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            If you like cooking for people and have room at your table, you could host a dinner. 
            Make something you\'re good at, meet your neighbors, cover groceries.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg"
          >
            I\'m interested
          </button>
        </div>
      </section>

      {/* Why host */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="serif text-3xl md:text-4xl text-foreground text-center mb-12">
          Why people host
        </h2>

        <div className="space-y-8">
          <div className="bg-secondary/20 rounded-lg p-6">
            <h3 className="serif text-xl text-foreground mb-3">You\'ll meet interesting people</h3>
            <p className="text-muted-foreground leading-relaxed">
              It\'s like throwing a dinner party where someone else invites the guests. 
              You get a full table without having to know everyone already.
            </p>
          </div>

          <div className="bg-secondary/20 rounded-lg p-6">
            <h3 className="serif text-xl text-foreground mb-3">Cover your costs (and then some)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Set a price that makes sense for what you\'re making. Most hosts charge enough to 
              cover ingredients and a bit of their time. Some make it a regular side income.
            </p>
          </div>

          <div className="bg-secondary/20 rounded-lg p-6">
            <h3 className="serif text-xl text-foreground mb-3">Cook what you already know</h3>
            <p className="text-muted-foreground leading-relaxed">
              You don\'t need to be a chef or invent new dishes. Make the thing you\'re known for — 
              your mom\'s recipe, the meal you always cook for friends, whatever you\'re confident making.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/20 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="serif text-3xl md:text-4xl text-foreground text-center mb-12">
            How it works
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="serif text-lg text-foreground mb-1">Tell us about your dinner</h3>
                <p className="text-muted-foreground">
                  Fill out a short form. We\'ll review it and get back to you in a few days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="serif text-lg text-foreground mb-1">Set your dates and price</h3>
                <p className="text-muted-foreground">
                  Once approved, pick when you want to host and how much to charge per person.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="serif text-lg text-foreground mb-1">People request seats</h3>
                <p className="text-muted-foreground">
                  We\'ll show your dinner to people nearby. When someone requests a seat, you confirm or decline.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="serif text-lg text-foreground mb-1">Cook and host</h3>
                <p className="text-muted-foreground">
                  On the day, make your food, set the table, and welcome everyone. We handle payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="serif text-3xl md:text-4xl text-foreground mb-4">
            Got a table and something to cook?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            That\'s all you need to start. We\'ll help with the rest.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start your application
          </button>
        </div>
      </section>
    </div>
  );
}
