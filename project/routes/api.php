<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\followerController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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
Route::get('/homePosts',[PostController::class,'getAllPosts'])->middleware('auth:sanctum');
Route::patch('/like/{id}',[PostController::class,'like'])->middleware('auth:sanctum');

Route::post('/comment/{id}',[PostController::class,'addComment'])->middleware('auth:sanctum');
Route::get('/comments/{id}',[PostController::class,'getComments'])->middleware('auth:sanctum');
Route::get('/users',[UserController::class,'getUsers'])->middleware('auth:sanctum');
Route::post('/follower/{id}',[followerController::class,'follow'])->middleware('auth:sanctum');

Route::get('/userprofile/{id}',[UserController::class,'getUser'])->middleware('auth:sanctum');
Route::get('/likedposts/{id}',[PostController::class,'getLikedPosts'])->middleware('auth:sanctum');
Route::get('/userposts/{id}',[PostController::class,'getPosts'])->middleware('auth:sanctum');

Route::post('/search',[UserController::class,'searchUsers'])->middleware('auth:sanctum');
Route::post('/edit',[UserController::class,'editUser'])->middleware('auth:sanctum');