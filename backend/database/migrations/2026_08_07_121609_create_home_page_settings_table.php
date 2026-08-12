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
        Schema::create('home_page_settings', function (Blueprint $table) {
            $table->id();
            $table->json('hero_slides')->nullable();
            $table->string('hero_title')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->string('hero_image_1')->nullable();
            $table->string('hero_title_2')->nullable();
            $table->string('hero_subtitle_2')->nullable();
            $table->string('hero_image_2')->nullable();
            $table->string('hero_title_3')->nullable();
            $table->string('hero_subtitle_3')->nullable();
            $table->string('hero_image_3')->nullable();
            $table->string('hero_title_4')->nullable();
            $table->string('hero_subtitle_4')->nullable();
            $table->string('hero_image_4')->nullable();
            $table->string('hero_title_5')->nullable();
            $table->string('hero_subtitle_5')->nullable();
            $table->string('hero_image_5')->nullable();
            
            $table->string('expert_advice_title')->nullable();
            $table->text('expert_advice_description')->nullable();
            $table->string('expert_advice_image')->nullable();

            $table->string('how_it_works_title')->nullable();
            $table->string('how_it_works_subtitle')->nullable();
            $table->string('step1_title')->nullable();
            $table->text('step1_description')->nullable();
            $table->string('step2_title')->nullable();
            $table->text('step2_description')->nullable();
            $table->string('step3_title')->nullable();
            $table->text('step3_description')->nullable();
            $table->string('brand_partners_title')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_page_settings');
    }
};
