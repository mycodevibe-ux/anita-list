<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KeyDate;
use Illuminate\Http\Request;

class KeyDateController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->keyDates);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $date = $request->user()->keyDates()->create($request->only('title', 'date'));

        return response()->json($date, 201);
    }

    public function show(Request $request, $id)
    {
        $date = $request->user()->keyDates()->findOrFail($id);
        return response()->json($date);
    }

    public function update(Request $request, $id)
    {
        $date = $request->user()->keyDates()->findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
        ]);

        $date->update($request->only('title', 'date'));

        return response()->json($date);
    }

    public function destroy(Request $request, $id)
    {
        $date = $request->user()->keyDates()->findOrFail($id);
        $date->delete();

        return response()->json(null, 204);
    }
}
