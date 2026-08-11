<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            
            // Header Settings
            $table->string('site_name')->default("anita's list");
            $table->string('header_logo')->nullable();
            $table->json('header_links')->nullable();
            $table->string('header_cta_label')->default('Create account');
            $table->string('header_cta_href')->default('/signup');

            // Footer Settings
            $table->string('footer_logo_symbol')->default('a');
            $table->string('footer_logo_image')->nullable();
            $table->string('footer_newsletter_title')->default('BE IN THE KNOW');
            $table->text('footer_newsletter_subtitle')->default('Be the first to know about new collections, news and exclusive offers');
            $table->json('footer_brand_links')->nullable();
            $table->json('footer_help_links')->nullable();
            $table->text('footer_copyright')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
