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
        Schema::table('home_page_settings', function (Blueprint $table) {
            $table->string('hero_title_2')->nullable();
            $table->string('hero_subtitle_2')->nullable();
            $table->string('hero_title_3')->nullable();
            $table->string('hero_subtitle_3')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('home_page_settings', function (Blueprint $table) {
            $table->dropColumn(['hero_title_2', 'hero_subtitle_2', 'hero_title_3', 'hero_subtitle_3']);
        });
    }
};
