<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePageSetting extends Model
{
    protected $fillable = [
        'hero_slides',
        'hero_title',
        'hero_subtitle',
        'hero_title_2',
        'hero_subtitle_2',
        'hero_title_3',
        'hero_subtitle_3',
        'hero_image_1',
        'hero_image_2',
        'hero_image_3',
        'how_it_works_title',
        'how_it_works_subtitle',
        'step1_title',
        'step1_description',
        'step2_title',
        'step2_description',
        'step3_title',
        'step3_description',
        'expert_advice_title',
        'expert_advice_description',
        'expert_advice_image',
        'brand_partners_title',
    ];

    protected $casts = [
        'hero_slides' => 'array',
    ];
}
