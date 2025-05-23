<?php
class Util
{
    public static function limpar($str)
    {
        $str = preg_replace('/[^a-zA-Z0-9\s]/', '', $str);
        return $str;
    }

    public static function real($valor)
    {
        return 'R$ ' . number_format($valor, 2, ',', '.');
    }

    public static function redirect($a)
    {
        header("Location: " . $a);
        exit;
    }

    public static function redirectFora($url)
    {
        echo "<script>window.open('{$url}', '_blank');</script>";
    }

    public static function redirecionaTempo($tempo, $a)
    {
        header("refresh:{$tempo};url={$a}");
        exit;
    }

    public static function urlinterna($url)
    {
        return "/{$url}";
    }

    public static function urlexterna($url)
    {
        return urlencode($url);
    }

    public static function imgpasta($diretorio)
    {
        $images = glob($diretorio . "/*.{jpg,png,gif}", GLOB_BRACE);
        if ($images) {
            return $images[array_rand($images)];
        }
        return null;
    }

    public static function imgexterno($url)
    {
        $html = file_get_contents($url);
        preg_match('/<img.+src=[\'"](?P<src>.+?)[\'"].*>/i', $html, $matches);
        return $matches['src'] ?? null;
    }

    public static function pre($p)
    {
        echo '<pre>';
        print_r($p);
        echo '</pre>';
    }

    public static function alerta($msg, $redidect)
    {
        echo "<script>alert('{$msg}');window.location='{$redidect}';</script>";
        exit;
    }

    public static function uri($i)
    {
        $url = isset($_GET['url']) ? explode('/', $_GET['url']) : [];
        return $url[$i] ?? null;
    }

    public static function realfloat($real)
    {
        return floatval(str_replace(['R$', '.', ','], ['', '', '.'], $real));
    }

    public static function generateSessionArray()
    {
        // Empty method as per analysis
    }

    public static function arr($query, $arr)
    {
        $sum = 0;
        foreach ($arr as $item) {
            if (isset($item[$query])) {
                $sum += $item[$query];
            }
        }
        return $sum;
    }
}
