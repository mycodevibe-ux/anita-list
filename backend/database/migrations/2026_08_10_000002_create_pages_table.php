<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
    public function up(): void
    {
        if (!Schema::hasTable('pages')) {
            Schema::create('pages', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('title');
                $table->string('subtitle')->nullable();
                $table->longText('content')->nullable();
                $table->string('banner_image')->nullable();
                $table->string('meta_title')->nullable();
                $table->text('meta_description')->nullable();
                $table->boolean('is_published')->default(true);
                $table->timestamps();
            });
        }

        // Add extra fields to home_page_settings table
        if (!Schema::hasColumn('home_page_settings', 'how_it_works_title')) {
            Schema::table('home_page_settings', function (Blueprint $table) {
                $table->string('how_it_works_title')->nullable();
                $table->string('how_it_works_subtitle')->nullable();
                $table->string('step1_title')->nullable();
                $table->text('step1_description')->nullable();
                $table->string('step2_title')->nullable();
                $table->text('step2_description')->nullable();
                $table->string('step3_title')->nullable();
                $table->text('step3_description')->nullable();
                $table->string('brand_partners_title')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
        Schema::table('home_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'how_it_works_title',
                'how_it_works_subtitle',
                'step1_title',
                'step1_description',
                'step2_title',
                'step2_description',
                'step3_title',
                'step3_description',
                'brand_partners_title',
            ]);
        });
    }
};
