'use client';

import type { EventData } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const FeaturedEventsCarousel = dynamic(() => import('@/components/featured-events-carousel'), {
  ssr: false, // Disable SSR for this component
  loading: () => (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-muted flex flex-col items-center justify-center text-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Carregando eventos em destaque...</p>
      <p className="text-sm text-muted-foreground">Por favor, aguarde.</p>
    </div>
  ),
});

interface FeaturedEventsCarouselLoaderProps {
  events: EventData[];
}

export default function FeaturedEventsCarouselLoader({ events }: FeaturedEventsCarouselLoaderProps) {
  return <FeaturedEventsCarousel events={events} />;
}
