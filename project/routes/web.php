<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;




Route::get('/', function () {
    return view('welcome'); // default landing page
});

// Example: auth-protected pages
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'home'])->name('dashboard');
});
