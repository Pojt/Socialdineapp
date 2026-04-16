export interface GuestProfile {
  id: string;
  name: string;
  avatar: string;
  city: string;
  oneLiner: string;
  interests: string[];
  dinnersAttended: number;
}

export const currentUser: GuestProfile = {
  id: 'me',
  name: 'Jordan',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  city: 'New York',
  oneLiner: 'Always up for a good meal and better conversation',
  interests: ['cities', 'architecture', 'coffee'],
  dinnersAttended: 3,
};

export interface DinnerExperience {
  id: string;
  host: {
    id: string;
    name: string;
    avatar: string;
    city: string;
    oneLiner: string;
    story: string;
    interests: string[];
    verified: boolean;
  };
  invitation: string;
  dishDescription: string;
  cuisine: string;
  tableVibe: string;
  soloFriendly: boolean;
  image: string;
  pricePerPerson: number;
  seatsAvailable: number;
  upcomingDates: string[];
  whatToExpect: string[];
  dietaryNotes?: string;
}

export interface Review {
  guestName: string;
  guestAvatar: string;
  comment: string;
  date: string;
}

export const dinnerExperiences: DinnerExperience[] = [
  {
    id: '1',
    host: {
      id: 'h1',
      name: 'Maria',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      city: 'Brooklyn',
      oneLiner: 'Making pasta the way my nonna taught me',
      story: 'I grew up in a small village outside Florence where Sunday lunch took all morning to prepare. Now in Brooklyn, I love recreating those slow afternoons around my table — fresh pasta, good wine, and the kind of conversation that stretches past dessert.',
      interests: ['Italian cinema', 'travel', 'local wine'],
      verified: true,
    },
    invitation: 'Join Maria for homemade pasta',
    dishDescription: 'Making fettuccine and tagliatelle from scratch',
    cuisine: 'Italian',
    tableVibe: 'Relaxed and talkative',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1665761543682-6305ccc5398b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBkaW5uZXIlMjBob21lJTIwY29va2luZ3xlbnwxfHx8fDE3NzYyODQxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 65,
    seatsAvailable: 6,
    upcomingDates: ['2026-04-18', '2026-04-22', '2026-04-25', '2026-05-01'],
    whatToExpect: [
      'We\'ll start with bruschetta and prosecco',
      'I\'ll show you how to make pasta dough (optional to join in)',
      'Two pasta courses with sauces from my family recipes',
      'Tiramisu and espresso to finish'
    ],
    dietaryNotes: 'Happy to make vegetarian. Let me know if you\'re dairy-free.'
  },
  {
    id: '2',
    host: {
      id: 'h2',
      name: 'Kenji',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      city: 'San Francisco',
      oneLiner: 'Trained in Tokyo, cooking for 6 at a time',
      story: 'I spent 8 years apprenticing at a small sushi counter in Shibuya. Here, I recreate that intimacy — just you, a few others, and fish I pick up at 5am. Each piece is made for you, one at a time.',
      interests: ['sake', 'Japanese craft', 'photography'],
      verified: true,
    },
    invitation: 'Join Kenji for omakase',
    dishDescription: 'Serving seasonal sushi, 12 pieces',
    cuisine: 'Japanese',
    tableVibe: 'Quiet and focused',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1557395715-8239a1f027b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN1c2hpJTIwZGlubmVyJTIwdGFibGV8ZW58MXx8fHwxNzc2Mjg0MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 120,
    seatsAvailable: 6,
    upcomingDates: ['2026-04-19', '2026-04-26', '2026-05-03'],
    whatToExpect: [
      'Sit at my counter and watch each piece come together',
      '12 pieces of nigiri, whatever looked best that morning',
      'A hand roll, miso soup, and green tea ice cream',
      'Stories about each fish and where it\'s from'
    ]
  },
  {
    id: '3',
    host: {
      id: 'h3',
      name: 'Carlos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      city: 'Austin',
      oneLiner: 'Tacos, mezcal, and my mom\'s recipes',
      story: 'Born in Oaxaca, raised on street food and family gatherings that lasted till midnight. My Austin backyard feels like home when it\'s full of people eating tacos, someone\'s making margaritas, and there\'s always one more story to tell.',
      interests: ['music', 'mezcal', 'football'],
      verified: true,
    },
    invitation: 'Join Carlos for tacos and mezcal',
    dishDescription: 'Grilling al pastor and making fresh tortillas',
    cuisine: 'Mexican',
    tableVibe: 'Lively and loud',
    soloFriendly: false,
    image: 'https://images.unsplash.com/photo-1746635732995-ab5c6118d5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBkaW5uZXIlMjBwYXJ0eXxlbnwxfHx8fDE3NzYyODQxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 55,
    seatsAvailable: 8,
    upcomingDates: ['2026-04-17', '2026-04-20', '2026-04-24', '2026-04-27'],
    whatToExpect: [
      'Guacamole made at the table',
      'Al pastor tacos straight off the grill',
      'Plenty of margaritas (or mezcal if you\'re feeling brave)',
      'Churros and chocolate to end the night'
    ],
    dietaryNotes: 'Easy to make vegan or gluten-free, just let me know.'
  },
  {
    id: '4',
    host: {
      id: 'h4',
      name: 'Sophie',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      city: 'New York',
      oneLiner: 'French bistro cooking in my Upper West Side kitchen',
      story: 'I left Paris five years ago but not the way I was raised to eat — long dinners, real ingredients, no rushing. My kitchen is tiny but my table always has room for one more.',
      interests: ['art', 'natural wine', 'literature'],
      verified: true,
    },
    invitation: 'Join Sophie for a French dinner',
    dishDescription: 'Cooking duck confit and crème brûlée',
    cuisine: 'French',
    tableVibe: 'Unhurried and thoughtful',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1673912401286-28ca0dbd17fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjdWlzaW5lJTIwZGlubmVyJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzYyODQxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 95,
    seatsAvailable: 6,
    upcomingDates: ['2026-04-21', '2026-04-28', '2026-05-05'],
    whatToExpect: [
      'French onion soup to start',
      'Duck confit with ratatouille',
      'A small cheese course',
      'Crème brûlée and wine pairings throughout'
    ],
    dietaryNotes: 'I can do vegetarian but it won\'t be quite the same.'
  },
  {
    id: '5',
    host: {
      id: 'h5',
      name: 'Layla',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      city: 'Los Angeles',
      oneLiner: 'Lebanese mezze the way we eat at home',
      story: 'My family\'s from Beirut, and every meal growing up was 15 dishes on the table, everyone reaching across, sharing bites. That\'s how I still like to eat — lots of small plates, and you never leave hungry.',
      interests: ['architecture', 'markets', 'Middle Eastern history'],
      verified: false,
    },
    invitation: 'Join Layla for mezze',
    dishDescription: 'Spreading the table with 12 dishes',
    cuisine: 'Lebanese',
    tableVibe: 'Warm and communal',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1767114915974-3481fa23cbb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwZGlubmVyJTIwc3ByZWFkfGVufDF8fHx8MTc3NjI4NDE1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 70,
    seatsAvailable: 10,
    upcomingDates: ['2026-04-16', '2026-04-23', '2026-04-30'],
    whatToExpect: [
      'Hummus, baba ganoush, tabbouleh — all made fresh',
      'Lamb skewers and falafel',
      'Warm pita straight from my oven',
      'Baklava and mint tea when we\'re finally full'
    ],
    dietaryNotes: 'Lots of vegan options naturally. Everything is halal.'
  },
  {
    id: '6',
    host: {
      id: 'h6',
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      city: 'Seattle',
      oneLiner: 'My grandmother\'s curries, made for you',
      story: 'Grew up in Mumbai watching my grandmother cook — never measuring, always tasting. These are her recipes, the ones I begged her to teach me before I moved to Seattle. Now I make them for anyone who\'ll sit at my table.',
      interests: ['Bollywood', 'hiking', 'spice markets'],
      verified: true,
    },
    invitation: 'Join Priya for curry night',
    dishDescription: 'Cooking chicken tikka masala and palak paneer',
    cuisine: 'Indian',
    tableVibe: 'Cosy and easy-going',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1755591915838-1fca1c7331d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMGRpbm5lciUyMGZlYXN0fGVufDF8fHx8MTc3NjI4NDE1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 60,
    seatsAvailable: 8,
    upcomingDates: ['2026-04-19', '2026-04-26', '2026-05-03', '2026-05-10'],
    whatToExpect: [
      'Samosas while we get to know each other',
      'Three curries — one mild, one spicy, one in between',
      'Fresh naan and rice',
      'Mango lassi and gulab jamun to finish'
    ],
    dietaryNotes: 'Vegetarian and vegan menus available. Everything is halal.'
  },
  {
    id: '7',
    host: {
      id: 'h7',
      name: 'Marcus',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      city: 'Nashville',
      oneLiner: 'Low and slow BBQ in my backyard',
      story: 'Learned to smoke meat from my uncle in Texas — the kind of cooking that takes all day and tastes like it. My Nashville backyard is small, but there\'s always room for a few more people around the grill.',
      interests: ['live music', 'American history', 'craft beer'],
      verified: true,
    },
    invitation: 'Join Marcus for backyard BBQ',
    dishDescription: 'Smoking brisket and ribs all day for you',
    cuisine: 'BBQ',
    tableVibe: 'Backyard and no-fuss',
    soloFriendly: false,
    image: 'https://images.unsplash.com/photo-1763062690254-be377d55dacf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBkaW5uZXIlMjBvdXRkb29yJTIwZ3JpbGxpbmd8ZW58MXx8fHwxNzc2Mjg0MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 75,
    seatsAvailable: 12,
    upcomingDates: ['2026-04-17', '2026-04-24', '2026-05-01', '2026-05-08'],
    whatToExpect: [
      'Brisket that\'s been on the smoker since 6am',
      'Ribs, pulled pork, all the sides',
      'Cornbread and pecan pie',
      'Cold drinks and probably some live music from my neighbor'
    ]
  },
  {
    id: '8',
    host: {
      id: 'h8',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
      city: 'Portland',
      oneLiner: 'Cooking whatever looks good at the farmers market',
      story: 'I trained in fancy restaurants but got tired of the pressure. Now I cook what feels right — whatever\'s in season, plated simply, shared with people who actually want to be here.',
      interests: ['foraging', 'ceramics', 'slow living'],
      verified: true,
    },
    invitation: 'Join Alex for a seasonal dinner',
    dishDescription: 'Cooking with what\'s fresh this week',
    cuisine: 'Seasonal',
    tableVibe: 'Curious and unhurried',
    soloFriendly: true,
    image: 'https://images.unsplash.com/photo-1612038792440-afb231b6ce15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGlubmVyJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc3NjI4NDE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerPerson: 110,
    seatsAvailable: 6,
    upcomingDates: ['2026-04-18', '2026-04-25', '2026-05-02'],
    whatToExpect: [
      'Four courses, menu changes weekly based on the market',
      'Last week was scallops and spring peas',
      'Wine pairings with each course',
      'Probably chocolate something for dessert'
    ],
    dietaryNotes: 'Can adjust for vegetarian if you let me know in advance.'
  }
];

export const reviews: { [hostId: string]: Review[] } = {
  h1: [
    {
      guestName: 'Sarah',
      guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      comment: 'I came alone and left with plans to see two of the other guests again. Maria is genuinely warm — the pasta was great but the conversation was better.',
      date: '2026-03-10'
    },
    {
      guestName: 'Michael',
      guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      comment: 'Felt immediately comfortable, even as a stranger. That\'s the thing — you\'re not a stranger for long.',
      date: '2026-02-28'
    }
  ],
  h2: [
    {
      guestName: 'Emily',
      guestAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      comment: 'Kenji is thoughtful and easy to talk to. Sitting at his counter felt like being let in on something private. One of the best evenings I\'ve had in SF.',
      date: '2026-03-15'
    }
  ],
  h3: [
    {
      guestName: 'David',
      guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      comment: 'Carlos has a way of making everyone feel like they\'ve known each other for years. New to Austin and this was exactly the kind of evening I needed.',
      date: '2026-03-05'
    }
  ],
  h4: [
    {
      guestName: 'Jessica',
      guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      comment: 'Sophie is a great host in the truest sense — she makes space for everyone at the table. We talked about Paris, about New York, about everything in between.',
      date: '2026-02-20'
    }
  ],
  h5: [
    {
      guestName: 'Ryan',
      guestAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      comment: 'The table was full and loud and warm. Layla is the kind of host who makes sure nobody sits quietly in a corner — in the best possible way.',
      date: '2026-03-12'
    }
  ],
  h6: [
    {
      guestName: 'Amanda',
      guestAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      comment: 'Priya is easy to talk to and genuinely curious about the people at her table. I went for the curry and stayed two hours longer than I expected.',
      date: '2026-02-15'
    }
  ],
  h7: [
    {
      guestName: 'Chris',
      guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      comment: 'Marcus is the kind of person you\'d want as a neighbour. Relaxed, funny, no pressure. The brisket helped too.',
      date: '2026-03-01'
    }
  ],
  h8: [
    {
      guestName: 'Nina',
      guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      comment: 'Small table, good people. Alex is quietly brilliant — they don\'t say much but what they do say is worth hearing. One of those evenings you don\'t want to end.',
      date: '2026-02-25'
    }
  ]
};

export interface Booking {
  id: string;
  experienceId: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
}

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    experienceId: '1',
    date: '2026-04-22',
    guests: 2,
    totalPrice: 130,
    status: 'upcoming'
  },
  {
    id: 'b2',
    experienceId: '5',
    date: '2026-03-15',
    guests: 4,
    totalPrice: 280,
    status: 'completed'
  },
  {
    id: 'b3',
    experienceId: '4',
    date: '2026-04-28',
    guests: 1,
    totalPrice: 95,
    status: 'pending'
  }
];
