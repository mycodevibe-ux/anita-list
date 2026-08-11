<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'buyingOptions']);
        
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        
        if ($request->has('is_recommended')) {
            $query->where('is_recommended', $request->is_recommended);
        }

        $products = $query->get();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'buyingOptions', 'specs'])->findOrFail($id);
        return response()->json($product);
    }
}
