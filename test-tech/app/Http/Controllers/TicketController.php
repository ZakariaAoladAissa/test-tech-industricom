<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with('user')->get();

        return response()->json($tickets);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'required|string',
            'speciality' => 'required|string',
        ]);

        //search for user with that speciality and has fewer tickets
        $user = User::where('speciality', $validatedData['speciality'])
            ->withCount('tickets')
            ->orderBy('tickets_count', 'asc')
            ->first();

        if (!$user) { return response()->json(['error' => 'No user found with this speciality'], 404); }
        
        $ticket = Ticket::create([ 'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'speciality' => $validatedData['speciality'],
            'user_id' => $user->id, // FK
        ]);

        return response()->json([ 'message' => 'Ticket created and assigned successfully', 'ticket' => $ticket ], 201);
    }
}
