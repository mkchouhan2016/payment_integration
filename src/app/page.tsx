'use client';

import { useState } from 'react';
import Carousel from './components/Carousel';
import PlantList from './components/PlantList';
import Footer from './components/Footer';
import { useSearch } from '@/app/context/SearchContext';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
    alt: 'Beautiful garden with various plants'
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
    alt: 'Colorful flowers in bloom'
  },
  {
    url: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f',
    alt: 'Indoor plants collection'
  },
  {
    url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9',
    alt: 'Tropical plants in greenhouse'
  }
];

export default function Home() {
  const {search} = useSearch();
  const [searchQuery] = useState(null);

  console.log("searchQuery", searchQuery);
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Carousel Section */}
          <section className="mb-12">
            <Carousel images={carouselImages} />
          </section>

          {/* Plant List Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Plant Collection'}
            </h2>
            <PlantList searchQuery={search} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
