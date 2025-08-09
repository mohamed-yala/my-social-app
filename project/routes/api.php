<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class,'login']);

Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::post('/signup',[AuthController::class,'signup']);

Route::post('/post',[PostController::class,'createPost'])->middleware('auth:sanctum','throttle:10,1');
Route::get('/userPost',[PostController::class,'getPosts'])->middleware('auth:sanctum');
Route::get('/homePosts',[PostController::class,'getAllPosts'])->middleware('auth:sanctum');
Route::patch('/like/{id}',[PostController::class,'like'])->middleware('auth:sanctum');
Route::get('/likedPosts',[PostController::class,'getLikedPosts'])->middleware('auth:sanctum');