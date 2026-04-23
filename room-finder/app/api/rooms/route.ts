import { NextResponse } from 'next/server';

const DUMMY_ROOMS = [
  {
    id: "1",
    type: "ROOM",
    date: "FROM 01 SEPTEMBER",
    rating: 4,
    reviews: 31,
    title: "Room in shared 4-bedroom apartment in Affori, Milan",
    price: 600,
    currency: "€",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop"
    ],
    badges: ["DEPOSIT PROTECTED", "SOME BILLS INCLUDED"],
    discount: null,
    checked: true,
  },
  {
    id: "2",
    type: "ROOM",
    date: "FROM 12 APRIL",
    rating: 5,
    reviews: 2,
    title: "Room in shared flat for rent in QT8, Milan",
    price: 600,
    currency: "€",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop"
    ],
    badges: ["DEPOSIT PROTECTED"],
    discount: null,
    checked: true,
  },
  {
    id: "3",
    type: "ROOM",
    date: "FROM 02 MAY",
    rating: 4.3,
    reviews: 10,
    title: "Furnished room in 3-bedroom apartment in Lorenteggio, Milan",
    price: 800,
    currency: "€",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
    ],
    badges: ["NO DEPOSIT", "BILLS INCLUDED"],
    discount: "UP TO 5 % OFF",
    checked: true,
  },
  {
    id: "4",
    type: "STUDIO",
    date: "AVAILABLE NOW",
    rating: 4.8,
    reviews: 15,
    title: "Modern studio apartment in Navigli, Milan with balcony",
    price: 1100,
    currency: "€",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1f2d9368ce?q=80&w=800&auto=format&fit=crop"
    ],
    badges: ["BILLS INCLUDED"],
    discount: "UP TO 10 % OFF",
    checked: false,
  },
  {
    id: "5",
    type: "APARTMENT",
    date: "FROM 01 OCT",
    rating: 4.9,
    reviews: 42,
    title: "Beautiful 2-bedroom flat in Brera, Milan",
    price: 1800,
    currency: "€",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
    ],
    badges: ["DEPOSIT PROTECTED", "NO DEPOSIT"],
    discount: null,
    checked: true,
  }
];

export async function GET() {
  return NextResponse.json(DUMMY_ROOMS);
}
