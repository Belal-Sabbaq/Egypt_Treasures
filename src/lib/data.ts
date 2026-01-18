// Types
export type Category = 'STAY' | 'EXPERIENCE' | 'CULTURE';

export interface Item {
  id: string;
  name: string;
  category: Category;
  location: string;
  price: number;
  rating: number;
  image: string;
  isGovAsset: boolean; // True for GEM, Museums
  isVerifiedPartner: boolean; // True for Safaris/Hotels
  coordinates: [number, number]; // For Map
  tags?: string[];
  description?: string;
  gallery?: string[];
  bookingOptions?: BookingOption[];
}

export interface BookingOption {
  id: string;
  providerName: string;
  type: 'DIRECT' | 'AGENCY' | 'PLATFORM';
  price: number;
  currency: string;
  features: string[];
  link: string;
  method: 'Instant' | 'Request' | 'External';
}

// Mock Data
export const INVENTORY: Item[] = [
  {
    id: 'h1',
    name: 'Adrère Amellal Eco-Lodge',
    category: 'STAY',
    location: 'Siwa',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=800',
    isGovAsset: false,
    isVerifiedPartner: true,
    coordinates: [29.203, 25.519],
    tags: ['luxury', 'eco', 'sustainable'],
    description: 'Experience timeless luxury in the heart of Siwa Oasis. Adrère Amellal is an eco-lodge built with traditional mud-brick techniques, offering an off-grid experience powered by starlight and candles.',
    gallery: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800'
    ],
    bookingOptions: [
      {
        id: 'b1',
        providerName: 'Adrère Amellal Direct',
        type: 'DIRECT',
        price: 350,
        currency: 'USD',
        features: ['All Inclusive', 'Eco-Tour included', 'Zero Carbon'],
        link: '#',
        method: 'Instant'
      },
      {
        id: 'b2',
        providerName: 'Horus Tourism',
        type: 'AGENCY',
        price: 380,
        currency: 'USD',
        features: ['VIP Transfer', 'Siwa Guide', '24/7 Support'],
        link: '#',
        method: 'Request'
      }
    ]
  },
  {
    id: 'e1',
    name: 'Great Sand Sea Safari (4x4)',
    category: 'EXPERIENCE',
    location: 'Siwa',
    price: 80,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800',
    isGovAsset: false,
    isVerifiedPartner: true,
    coordinates: [29.1, 25.4],
    tags: ['adventure', 'safari', 'desert'],
    description: 'Venture into the vast dunes of the Great Sand Sea. Our professional desert drivers will take you on an adrenaline-fueled journey across the shifting sands, visiting ancient fossil sites and hidden cold springs.',
    gallery: [
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469033019747-ba489f664f3c?auto=format&fit=crop&q=80&w=800'
    ],
    bookingOptions: [
      {
        id: 'b3',
        providerName: 'Desert Kings Safari',
        type: 'DIRECT',
        price: 80,
        currency: 'USD',
        features: ['Expert Local Driver', 'Sandboarding included', 'Sunset Tea'],
        link: '#',
        method: 'Instant'
      }
    ]
  },
  {
    id: 'c1',
    name: 'Grand Egyptian Museum (VIP Ticket)',
    category: 'CULTURE',
    location: 'Cairo',
    price: 40,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=800',
    isGovAsset: true,
    isVerifiedPartner: true,
    coordinates: [30.0, 31.2],
    tags: ['GEM', 'history', 'official', 'visa'],
    description: 'Be among the first to explore the world’s largest archaeological museum. This VIP ticket grants you early access to the Grand Staircase, statutory collection, and the Tutankhamun gallery.',
    gallery: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800'
    ],
    bookingOptions: [
      {
        id: 'b4',
        providerName: 'Ministry of Tourism',
        type: 'DIRECT',
        price: 40,
        currency: 'USD',
        features: ['Official E-Ticket', 'Priority Entry', 'Proceeds to Antiquities Fund'],
        link: '#',
        method: 'Instant'
      }
    ]
  }
];
