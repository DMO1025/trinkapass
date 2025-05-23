<?php
// layout.php - Master page template
// Usage: include layout.php and pass $title and $content variables

if (!isset($title)) {
    $title = 'TrinkaPass';
}
if (!isset($content)) {
    $content = '';
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= htmlspecialchars($title) ?></title>
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

        body {
            padding-top: 70px;
            /* for fixed navbar */
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div class="container">
                <a class="navbar-brand fw-bold fs-3" href="/home">TrinkaPass</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/home">About us</a>
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
                                    <li><a class="dropdown-item" href="/logout">Logout</a></li>
                                </ul>
                            <?php else: ?>
                                <a class="nav-link" href="/login">Login</a>
                            <?php endif; ?>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main class="container py-4">
        <?php if (!empty($content)): ?>
            <?= $content ?>
        <?php else: ?>
            <p><em>No content to display.</em></p>
        <?php endif; ?>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/main.js"></script>
</body>

</html>