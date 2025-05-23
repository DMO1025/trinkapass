<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Home - Usuários</title>
</head>

<body>
    <h1>Lista de Usuários</h1>
    <?php if (!empty($usuarios)): ?>
        <ul>
            <?php foreach ($usuarios as $usuario): ?>
                <li><?php echo htmlspecialchars($usuario['nome']); ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Nenhum usuário encontrado.</p>
    <?php endif; ?>
</body>

</html>