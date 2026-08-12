FROM php:8.2-apache

ENV APP_ENV=production
ENV APP_DEBUG=true
ENV APP_KEY=base64:GFJvxsWXPiH+z4NNJ9J9YgbcMmPkKok2fZbMy/nfMU4=
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite

# Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

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

RUN cp .env.example .env && mkdir -p database && touch database/database.sqlite && chmod -R 777 storage bootstrap/cache database

RUN composer install --no-dev --optimize-autoloader

RUN php artisan filament:upgrade

# Configure Apache port dynamically for Render ($PORT)
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 80

CMD ["sh", "-c", "php artisan key:generate --force && php artisan storage:link && php artisan migrate --force && php artisan db:seed --force && apache2-foreground"]
