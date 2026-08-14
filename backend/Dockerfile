FROM php:8.2-apache

ENV APP_ENV=production
ENV APP_DEBUG=true
ENV APP_KEY=base64:GFJvxsWXPiH+z4NNJ9J9YgbcMmPkKok2fZbMy/nfMU4=
ENV APP_URL=https://anita-list-backend-production.up.railway.app
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite

# Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# Configure PHP upload limits & memory limit for Livewire uploads
RUN echo "upload_max_filesize = 64M\npost_max_size = 64M\nmemory_limit = 512M" > /usr/local/etc/php/conf.d/uploads.ini

# Change Apache DocumentRoot to Laravel public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Install pre-compiled binary PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd zip intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN cp .env.example .env && \
    mkdir -p database storage/app/public/homepage storage/app/public/avatars storage/app/public/products storage/app/livewire-tmp storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache && \
    touch database/database.sqlite && \
    chown -R www-data:www-data storage bootstrap/cache database && \
    chmod -R 777 storage bootstrap/cache database

RUN composer install --no-dev --optimize-autoloader

RUN php artisan filament:upgrade

# Configure Apache port dynamically for Render ($PORT)
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 80

CMD ["sh", "-c", "mkdir -p storage/app/public/homepage storage/app/public/avatars storage/app/livewire-tmp && chown -R www-data:www-data storage bootstrap/cache && chmod -R 777 storage bootstrap/cache && php artisan key:generate --force && php artisan storage:link --force && php artisan migrate --force && apache2-foreground"]
