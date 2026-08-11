<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        return response()->json(Page::where('is_published', true)->get());
    }

    public function show($slug)
    {
        $page = Page::where('slug', $slug)->where('is_published', true)->first();

        if (! $page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json($page);
    }
}
