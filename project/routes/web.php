<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;



<<<<<<< HEAD

Route::get('/', function () {
    return view('welcome'); // default landing page
});

// Example: auth-protected pages
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'home'])->name('dashboard');
});
=======
Route::middleware(['auth','verified'])->group(function(){
 Route::get('/',[HomeController::class,'home'])->name('dashboard');
});


>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
