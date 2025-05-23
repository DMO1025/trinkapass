document.addEventListener('DOMContentLoaded', () => {
    const searchTermInput = document.getElementById('searchTerm');
    const eventDateInput = document.getElementById('eventDate');
    const eventCitySelect = document.getElementById('eventCity');
    const priceRangeInput = document.getElementById('priceRange');
    const priceMinSpan = document.getElementById('priceMin');
    const priceMaxSpan = document.getElementById('priceMax');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const eventsContainer = document.getElementById('eventsContainer');

    let filteredEvents = [...eventsData];

    // Populate city select options
    const cities = [...new Set(eventsData.map(e => e.cidade))].sort();
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        eventCitySelect.appendChild(option);
    });

    // Set price range max based on max event price
    const maxPrice = Math.max(...eventsData.map(e => e.preco_ingresso), 500);
    priceRangeInput.max = maxPrice;
    priceRangeInput.value = maxPrice;
    priceMaxSpan.textContent = `R$ ${maxPrice}`;

    function filterEvents() {
        const searchTerm = searchTermInput.value.toLowerCase();
        const selectedDate = eventDateInput.value;
        const selectedCity = eventCitySelect.value;
        const maxPriceValue = parseFloat(priceRangeInput.value);

        filteredEvents = eventsData.filter(event => {
            const matchesSearch = event.nome_evento.toLowerCase().includes(searchTerm) ||
                event.local.toLowerCase().includes(searchTerm) ||
                event.descricao.toLowerCase().includes(searchTerm) ||
                event.cidade.toLowerCase().includes(searchTerm);

            const matchesDate = !selectedDate || event.data_horario.startsWith(selectedDate);

            const matchesCity = selectedCity === '__ALL__' || event.cidade === selectedCity;

            const matchesPrice = event.preco_ingresso <= maxPriceValue;

            return matchesSearch && matchesDate && matchesCity && matchesPrice;
        });

        renderEvents();
    }

    function renderEvents() {
        eventsContainer.innerHTML = '';
        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<div class="text-center py-5"><p class="fs-4 text-muted">Nenhum evento encontrado com os filtros selecionados.</p></div>';
            return;
        }
        filteredEvents.forEach(event => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'event-card';

            if (event.imagem_url) {
                const img = document.createElement('img');
                img.src = event.imagem_url;
                img.alt = event.nome_evento;
                cardDiv.appendChild(img);
            }

            const title = document.createElement('h5');
            title.textContent = event.nome_evento;
            cardDiv.appendChild(title);

            const description = document.createElement('p');
            description.textContent = event.descricao;
            cardDiv.appendChild(description);

            const date = document.createElement('p');
            const eventDate = new Date(event.data_horario);
            date.textContent = eventDate.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
            cardDiv.appendChild(date);

            colDiv.appendChild(cardDiv);
            eventsContainer.appendChild(colDiv);
        });
    }

    // Event listeners
    searchTermInput.addEventListener('input', filterEvents);
    eventDateInput.addEventListener('change', filterEvents);
    eventCitySelect.addEventListener('change', filterEvents);
    priceRangeInput.addEventListener('input', () => {
        priceMaxSpan.textContent = `R$ ${priceRangeInput.value}`;
        filterEvents();
    });
    resetFiltersBtn.addEventListener('click', () => {
        searchTermInput.value = '';
        eventDateInput.value = '';
        eventCitySelect.value = '__ALL__';
        priceRangeInput.value = maxPrice;
        priceMaxSpan.textContent = `R$ ${maxPrice}`;
        filterEvents();
    });

    // Initial render
    filterEvents();
});
