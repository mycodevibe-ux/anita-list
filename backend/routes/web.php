<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

// Auto-restore safeguard for Main Admin user
if (\Illuminate\Support\Facades\Schema::hasTable('users')) {
    $admin = User::where('email', 'admin@admin.com')->first();
    if (!$admin) {
        $admin = new User();
        $admin->name = 'Main Admin';
        $admin->email = 'admin@admin.com';
        $admin->password = 'admin123';
        $admin->save();
    }

    $test = User::where('email', 'test@example.com')->first();
    if (!$test) {
        $test = new User();
        $test->name = 'Test User';
        $test->email = 'test@example.com';
        $test->password = 'password';
        $test->save();
    }
}

Route::get('/', function () {
    return view('welcome');
});

// Storage File Access Fallback Route
Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    return response()->file($filePath);
})->where('path', '.*');
