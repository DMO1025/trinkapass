
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { EventData } from '@/lib/types';
import EventCard from '@/components/event-card';
import { Calendar } from '@/components/ui/calendar'; // Keep ShadCN Calendar
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Keep ShadCN Popover
import { Slider } from '@/components/ui/slider'; // Keep ShadCN Slider
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Keep ShadCN Select
import { CalendarIcon, Filter as FilterIcon, Search, X, MapPin } from 'lucide-react'; 
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils'; // For ShadCN components

interface EventListAndFiltersProps {
  initialEvents: EventData[];
}

const ALL_CITIES_VALUE = "___ALL_CITIES___";

export default function EventListAndFilters({ initialEvents }: EventListAndFiltersProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>(ALL_CITIES_VALUE); 
  
  const maxPossiblePrice = useMemo(() => {
    if (initialEvents.length === 0) return 500; 
    return Math.max(...initialEvents.map(event => event.preco_ingresso), 1); 
  }, [initialEvents]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPossiblePrice]);

  const availableCities = useMemo(() => {
    const cities = new Set(initialEvents.map(event => event.cidade));
    return Array.from(cities).sort();
  }, [initialEvents]);

  useEffect(() => {
    setPriceRange(currentRange => [currentRange[0], Math.max(currentRange[1], maxPossiblePrice)]);
  }, [maxPossiblePrice]);

  const filteredEvents = useMemo(() => {
    let events = [...initialEvents];

    if (searchTerm) {
      events = events.filter(event =>
        event.nome_evento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.cidade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDate) {
      events = events.filter(event => {
        try {
          return isSameDay(parseISO(event.data_horario), selectedDate);
        } catch (e) { return false; }
      });
    }
    
    if (selectedCity && selectedCity !== ALL_CITIES_VALUE) {
      events = events.filter(event => event.cidade === selectedCity);
    }

    events = events.filter(event => event.preco_ingresso >= priceRange[0] && event.preco_ingresso <= priceRange[1]);

    return events;
  }, [initialEvents, selectedDate, priceRange, searchTerm, selectedCity]);

  const resetFilters = () => {
    setSelectedDate(undefined);
    setPriceRange([0, maxPossiblePrice]);
    setSearchTerm('');
    setSelectedCity(ALL_CITIES_VALUE); 
  };

  return (
    <div className="vstack gap-4 gap-md-5">
      <div className="p-3 p-md-4 bg-light card border rounded-3"> {/* Removed shadow-lg, border-0 */}
        <h2 className="fs-3 fw-semibold text-primary mb-4 d-flex align-items-center gap-2">
          <FilterIcon className="h-6 w-6" /> Filtrar Eventos
        </h2>
        <div className="row g-3 align-items-end">
          <div className="col-lg-3 col-md-6">
            <label htmlFor="search-term" className="form-label small fw-medium">Pesquisar</label>
            <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><Search className="h-5 w-5 text-muted" /></span>
                <input
                    id="search-term"
                    type="text"
                    placeholder="Nome, local, cidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control border-start-0"
                />
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <label htmlFor="event-date" className="form-label small fw-medium">Data do Evento</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  id="event-date"
                  className={cn(
                    "form-control text-start d-flex align-items-center w-100", // Bootstrap classes
                    !selectedDate && "text-muted"
                  )}
                >
                  <CalendarIcon className="me-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <label htmlFor="event-city" className="form-label small fw-medium">Cidade</label>
             <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger id="event-city" className={cn("form-select w-100")}> {/* ShadCN trigger with BS form-select */}
                 <MapPin className="me-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Todas as cidades" />
              </SelectTrigger>
              <SelectContent> {/* ShadCN content */}
                <SelectItem value={ALL_CITIES_VALUE}>Todas as cidades</SelectItem>
                {availableCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="form-label small fw-medium">Faixa de Preço (R$)</label>
            <Slider
              min={0}
              max={maxPossiblePrice} 
              step={Math.max(1, Math.floor(maxPossiblePrice / 100))} 
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-100 mt-1" // ShadCN slider
            />
            <div className="d-flex justify-content-between small text-muted mt-1">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}{priceRange[1] === maxPossiblePrice && initialEvents.some(e => e.preco_ingresso > maxPossiblePrice) ? '+' : ''}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
            <button onClick={resetFilters} className="btn btn-secondary d-flex align-items-center gap-2">
                <X className="h-4 w-4" />
                Limpar Filtros
            </button>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="col">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="fs-4 text-muted">
            Nenhum evento encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}

