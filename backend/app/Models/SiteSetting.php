<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'header_logo',
        'header_links',
        'header_cta_label',
        'header_cta_href',
        'footer_logo_symbol',
        'footer_logo_image',
        'footer_newsletter_title',
        'footer_newsletter_subtitle',
        'footer_brand_links',
        'footer_help_links',
        'footer_copyright',
        'login_image',
        'signup_image',
        'login_badge',
        'login_title',
        'login_button_text',
        'signup_badge',
        'signup_title',
        'signup_button_text',
    ];

    protected $casts = [
        'header_links' => 'array',
        'footer_brand_links' => 'array',
        'footer_help_links' => 'array',
    ];

    public function setFooterLogoSymbolAttribute($value)
    {
        $this->attributes['footer_logo_symbol'] = $value ?: 'a';
    }

    public function setSiteNameAttribute($value)
    {
        $this->attributes['site_name'] = $value ?: "anita's list";
    }
}
