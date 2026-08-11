<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserListItem;
use Illuminate\Http\Request;

class UserListItemController extends Controller
{
    public function index(Request $request, $listId)
    {
        $list = $request->user()->userLists()->findOrFail($listId);
        return response()->json($list->items()->with('product')->get());
    }

    public function store(Request $request, $listId)
    {
        $list = $request->user()->userLists()->findOrFail($listId);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
            'status' => 'in:bought,pending,to-buy',
        ]);

        $item = $list->items()->create($request->only('product_id', 'quantity', 'status'));

        return response()->json($item->load('product'), 201);
    }

    public function update(Request $request, $listId, $itemId)
    {
        $list = $request->user()->userLists()->findOrFail($listId);
        $item = $list->items()->findOrFail($itemId);

        $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:bought,pending,to-buy',
        ]);

        $item->update($request->only('quantity', 'status'));

        return response()->json($item->load('product'));
    }

    public function destroy(Request $request, $listId, $itemId)
    {
        $list = $request->user()->userLists()->findOrFail($listId);
        $item = $list->items()->findOrFail($itemId);
        $item->delete();

        return response()->json(null, 204);
    }
}
