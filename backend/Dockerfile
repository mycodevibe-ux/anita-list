FROM php:8.2-cli

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_KEY=base64:GFJvxsWXPiH+z4NNJ9J9YgbcMmPkKok2fZbMy/nfMU4=
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    zip \
    unzip \
    libzip-dev \
    libicu-dev

RUN docker-php-ext-configure intl && docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd zip intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN cp .env.example .env && mkdir -p database && touch database/database.sqlite && chmod -R 777 storage bootstrap/cache database

RUN composer install --no-dev --optimize-autoloader

EXPOSE 8000

CMD ["sh", "-c", "php artisan key:generate --force && php artisan storage:link && php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8000"]
