FROM php:8.2-cli

ENV APP_ENV=production
ENV APP_DEBUG=true
ENV APP_KEY=base64:GFJvxsWXPiH+z4NNJ9J9YgbcMmPkKok2fZbMy/nfMU4=
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd zip intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN cp .env.example .env && mkdir -p database && touch database/database.sqlite && chmod -R 777 storage bootstrap/cache database

RUN composer install --no-dev --optimize-autoloader

RUN php artisan filament:upgrade

EXPOSE 8000

CMD ["sh", "-c", "php artisan key:generate --force && php artisan storage:link && php artisan migrate --force && php artisan db:seed --force && php -S 0.0.0.0:${PORT:-8000} -t public"]
