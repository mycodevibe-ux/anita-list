<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'min_price', 'max_price', 'image_url', 'is_recommended', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function buyingOptions()
    {
        return $this->hasMany(BuyingOption::class);
    }

    public function specs()
    {
        return $this->hasMany(ProductSpec::class);
    }
}
