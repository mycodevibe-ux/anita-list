<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserList;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserListController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'list');
        $lists = $request->user()->userLists()->where('type', $type)->with('items.product')->get();
        return response()->json($lists);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'nullable|in:list,registry',
        ]);

        $type = $request->type ?? 'list';
        $shareToken = $type === 'registry' ? Str::uuid()->toString() : null;

        $list = $request->user()->userLists()->create([
            'title' => $request->title,
            'type' => $type,
            'share_token' => $shareToken,
        ]);

        return response()->json($list, 201);
    }

    public function show(Request $request, $id)
    {
        $list = $request->user()->userLists()->with('items.product.category')->findOrFail($id);
        return response()->json($list);
    }

    public function update(Request $request, $id)
    {
        $list = $request->user()->userLists()->findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
        ]);

        $list->update($request->only('title'));

        return response()->json($list);
    }

    public function destroy(Request $request, $id)
    {
        $list = $request->user()->userLists()->findOrFail($id);
        $list->delete();

        return response()->json(null, 204);
    }

    public function convertToRegistry(Request $request, $id)
    {
        $list = $request->user()->userLists()->findOrFail($id);
        
        if ($list->type === 'registry') {
            return response()->json(['message' => 'Already a registry'], 400);
        }

        $list->update([
            'type' => 'registry',
            'share_token' => Str::uuid()->toString(),
        ]);

        return response()->json($list);
    }

    public function showShared($token)
    {
        $registry = UserList::with('items.product.category')
            ->where('type', 'registry')
            ->where('share_token', $token)
            ->firstOrFail();
            
        return response()->json($registry);
    }

    public function updateSharedItemStatus(Request $request, $token, $itemId)
    {
        $registry = UserList::where('type', 'registry')->where('share_token', $token)->firstOrFail();
        $item = $registry->items()->findOrFail($itemId);

        $request->validate([
            'status' => 'required|in:bought,pending,to-buy',
        ]);

        $item->update([
            'status' => $request->status,
        ]);

        return response()->json($item);
    }
}
