<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserList extends Model
{
    protected $fillable = ['user_id', 'title', 'type', 'share_token'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(UserListItem::class);
    }
}
