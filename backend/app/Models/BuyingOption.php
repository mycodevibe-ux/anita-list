<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuyingOption extends Model
{
    protected $fillable = ['product_id', 'retailer_name', 'price', 'url', 'is_primary'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
