<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

 Route::prefix('tickets')->group(function () {
    // Route to store a new post
    Route::post('/', [TicketController::class, 'store']);
  
    // Route to get all tickets (publicly accessible)
    Route::get('/', [TicketController::class, 'index']);
    
});