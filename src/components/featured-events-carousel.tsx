
'use client';

import type { EventData } from '@/lib/types';
import EventCard from '@/components/event-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Keep ShadCN Carousel
import Autoplay from "embla-carousel-autoplay";
import * as React from 'react';

interface FeaturedEventsCarouselProps {
  events: EventData[];
}

export default function FeaturedEventsCarousel({ events }: FeaturedEventsCarouselProps) {
  if (!events || events.length === 0) {
    return null; 
  }

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    // Removed container-fluid. Carousel will be full-width. EventCard inside handles its content presentation.
    <div className="position-relative w-100 group overflow-hidden"> 
      <Carousel
        opts={{
          align: "start",
          loop: events.length > 1, 
        }}
        plugins={[plugin.current]}
        className="w-100" 
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ms-0"> {/* Ensure no negative margin from ShadCN default */}
          {events.map((event) => (
            <CarouselItem key={event.id} className="ps-0 flex-shrink-0 w-100"> {/* Ensure item is full width */}
              <div> 
                <EventCard event={event} isFeatured={true} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {events.length > 1 && ( 
          <>
            <CarouselPrevious className="position-absolute start-0 top-50 translate-middle-y z-10 ms-3 btn btn-secondary text-white rounded-circle d-none d-md-flex p-2" /> {/* Removed shadow */}
            <CarouselNext className="position-absolute end-0 top-50 translate-middle-y z-10 me-3 btn btn-secondary text-white rounded-circle d-none d-md-flex p-2" /> {/* Removed shadow */}
          </>
        )}
      </Carousel>
    </div>
  );
}

