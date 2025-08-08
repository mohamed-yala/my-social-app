<?php

namespace App\Http\Controllers;

use App\Helpers\Responder;
use App\Http\Requests\postRequest;
use App\Models\Post;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;

class PostController extends Controller
{
   public function createPost(postRequest $request){
    $data=$request->validated();
    if($request->hasFile('picture')){
      $data['picture']=$request->file('picture')->store('posts','public');
    }
    $request->user()->post()->create($data);
    return Responder::success($data,'success',201);
   }

   public function getPosts(Request $request){
      $user=$request->user();
      $data=$user->post()->get();
      return Responder::success($data,'success',200);
   }
   public function getAllPosts(){
      $data=Post::orderBy('created_at','desc')->get();
      return Responder::success($data,'success',200);
   }
}
