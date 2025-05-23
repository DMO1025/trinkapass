<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TrinkaPass - Eventos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
    <style>
        /* Custom styles */
        .event-card img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
        }

        .event-card {
            border: 1px solid #dee2e6;
            border-radius: 0.375rem;
            padding: 1rem;
            background-color: #fff;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .event-card h5 {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .event-card p {
            flex-grow: 1;
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div class="container">
                <a class="navbar-brand fw-bold fs-3" href="?route=home">TrinkaPass</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="?route=home">About us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Feedback</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Find us</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav d-flex align-items-center">
                        <li class="nav-item me-3">
                            <a class="nav-link position-relative" href="#">
                                <i class="bi bi-cart3 fs-4"></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </a>
                        </li>
                        <li class="nav-item me-3">
                            <a class="nav-link" href="#">
                                <i class="bi bi-search fs-4"></i>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <?php if (isset($_SESSION['user'])): ?>
                                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle fs-4 me-1"></i>
                                    <span><?= htmlspecialchars($_SESSION['user']['nome']) ?></span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li><a class="dropdown-item" href="?route=logout">Logout</a></li>
                                </ul>
                            <?php else: ?>
                                <a class="nav-link" href="?route=login">
                                    <i class="bi bi-person-circle fs-4"></i>
                                </a>
                            <?php endif; ?>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main class="container py-4">
        <?php if (count($events) > 0): ?>
            <section class="mb-4 mb-md-5">
                <div id="featuredEventsCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <?php foreach (array_slice($events, 0, 5) as $index => $event): ?>
                            <div class="carousel-item <?= $index === 0 ? 'active' : '' ?>">
                                <?php if (!empty($event['imagem_url'])): ?>
                                    <img src="<?= htmlspecialchars($event['imagem_url']) ?>" class="d-block w-100" alt="<?= htmlspecialchars($event['nome_evento']) ?>" style="max-height: 400px; object-fit: cover;" />
                                <?php else: ?>
                                    <div class="d-flex align-items-center justify-content-center bg-secondary text-white" style="height: 400px;">
                                        <h3>Imagem não disponível</h3>
                                    </div>
                                <?php endif; ?>
                                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                    <h5><?= htmlspecialchars($event['nome_evento']) ?></h5>
                                    <p><?= htmlspecialchars($event['descricao']) ?></p>
                                    <p><small><?= (new DateTimeImmutable($event['data_horario']))->format('d/m/Y H:i') ?></small></p>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#featuredEventsCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#featuredEventsCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Próximo</span>
                    </button>
                </div>
            </section>
        <?php endif; ?>

        <section>
            <div class="text-center mb-4 pt-3">
                <h1 class="display-4 fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-ticket-perforated h1"></i> Todos os Eventos
                </h1>
                <p class="fs-5 text-muted">Encontre os melhores eventos e garanta seu ingresso!</p>
            </div>

            <div class="card p-4 mb-4">
                <h2 class="fs-3 fw-semibold text-primary mb-4 d-flex align-items-center gap-2">
                    <i class="bi bi-funnel-fill"></i> Filtrar Eventos
                </h2>
                <div class="row g-3 align-items-end">
                    <div class="col-lg-3 col-md-6">
                        <label for="searchTerm" class="form-label small fw-medium">Pesquisar</label>
                        <input type="text" id="searchTerm" class="form-control" placeholder="Nome, local, cidade..." />
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="eventDate" class="form-label small fw-medium">Data do Evento</label>
                        <input type="date" id="eventDate" class="form-control" />
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="eventCity" class="form-label small fw-medium">Cidade</label>
                        <select id="eventCity" class="form-select">
                            <option value="__ALL__">Todas as cidades</option>
                        </select>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <label for="priceRange" class="form-label small fw-medium">Faixa de Preço (R$)</label>
                        <input type="range" class="form-range" id="priceRange" min="0" max="500" step="1" />
                        <div class="d-flex justify-content-between small text-muted mt-1">
                            <span id="priceMin">R$ 0</span>
                            <span id="priceMax">R$ 500</span>
                        </div>
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-end">
                    <button id="resetFilters" class="btn btn-secondary d-flex align-items-center gap-2">
                        <i class="bi bi-x-lg"></i> Limpar Filtros
                    </button>
                </div>
            </div>

            <div id="eventsContainer" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <!-- Event cards will be rendered here by JS -->
            </div>
        </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/main.js"></script>
    <script>
        // Pass PHP events data to JS
        const eventsData = <?= json_encode($events, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;
    </script>
</body>

</html>