<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->notes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note = $request->user()->notes()->create($request->only('title', 'content'));

        return response()->json($note, 201);
    }

    public function show(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);
        return response()->json($note);
    }

    public function update(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
        ]);

        $note->update($request->only('title', 'content'));

        return response()->json($note);
    }

    public function destroy(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);
        $note->delete();

        return response()->json(null, 204);
    }
}
