<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== 'localhost' && $_SERVER['HTTP_HOST'] !== '127.0.0.1') {
            URL::forceScheme('https');
            URL::forceRootUrl('https://' . $_SERVER['HTTP_HOST']);
        } else if (config('app.env') !== 'local' || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) || isset($_SERVER['RAILWAY_STATIC_URL'])) {
            URL::forceScheme('https');
        }

        // Ensure storage and temporary upload directories exist in production
        $dirs = [
            storage_path('app/public'),
            storage_path('app/public/homepage'),
            storage_path('app/public/avatars'),
            storage_path('app/public/products'),
            storage_path('app/public/livewire-tmp'),
            storage_path('app/livewire-tmp'),
        ];

        foreach ($dirs as $dir) {
            if (!file_exists($dir)) {
                @mkdir($dir, 0777, true);
            }
        }
    }
}
