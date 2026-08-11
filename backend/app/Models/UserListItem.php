<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserListItem extends Model
{
    protected $fillable = ['user_list_id', 'product_id', 'quantity', 'status'];

    public function userList()
    {
        return $this->belongsTo(UserList::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
