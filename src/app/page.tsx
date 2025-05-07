import { getEvents } from '@/lib/data-service';
import type { EventData } from '@/lib/types';
import { Ticket } from 'lucide-react'; 
import EventListAndFilters from '@/components/event-list-filters';
import FeaturedEventsCarouselLoader from '@/components/featured-events-carousel-loader';


export default async function HomePage() {
  const allEvents = await getEvents();

  const availableFutureEvents = allEvents
    .filter(event => {
      try {
        return event.quantidade_disponivel > 0 && new Date(event.data_horario) >= new Date(new Date().setHours(0,0,0,0));
      } catch (e) {
        console.warn(`Invalid date for event ${event.id}: ${event.data_horario}`);
        return false;
      }
    })
    .sort((a, b) => {
        try {
            return new Date(a.data_horario).getTime() - new Date(b.data_horario).getTime();
        } catch (e) {
            return 0;
        }
    });

  const featuredEventsForCarousel = availableFutureEvents.slice(0, 5);

  return (
    <>
      {featuredEventsForCarousel.length > 0 ? (
        <section className="w-100 mb-4 mb-md-5"> {/* Use w-100 for full width */}
          <FeaturedEventsCarouselLoader events={featuredEventsForCarousel} />
        </section>
      ) : (
        null 
      )}

      <div className="container-fluid container-lg px-3 py-4 py-md-5"> {/* Bootstrap container classes */}
        <div className="text-center mb-4 pt-3">
          <h1 className="display-4 fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
            <Ticket className="h-10 w-10" /> Todos os Eventos
          </h1>
          <p className="fs-5 text-muted">
            Encontre os melhores eventos e garanta seu ingresso!
          </p>
        </div>
        
        <EventListAndFilters initialEvents={availableFutureEvents} />
      </div>
    </>
  );
}
