<?php
class Assets
{
    private static $css = [];
    private static $js = [];

    public static function loadAssets($assets)
    {
        foreach ($assets as $asset) {
            $ext = pathinfo($asset, PATHINFO_EXTENSION);
            if ($ext === 'css') {
                echo "<link rel='stylesheet' href='{$asset}'>\n";
                self::$css[] = $asset;
            } elseif ($ext === 'js') {
                echo "<script src='{$asset}'></script>\n";
                self::$js[] = $asset;
            }
        }
    }

    public static function getAssets()
    {
        return [
            'css' => self::$css,
            'js' => self::$js
        ];
    }
}
