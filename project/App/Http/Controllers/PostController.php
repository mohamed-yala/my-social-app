<?php

namespace App\Http\Controllers;

use App\Helpers\Responder;
use App\Http\Requests\postRequest;
use App\Models\Like;
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


   public function like(Request $request,$id){
     $post=Post::findOrFail($id);
     $user=$request->user();
     $like=Like::where('user_id',$user->id)->where('post_id',$post->id)->first();
     
    if($like){
       $post->decrement('likes');
       Like::where([
         ['user_id',$user->id],
         ['post_id',$post->id]
       ])->delete();
    }else{
      $post->increment('likes');
      Like::create([
         'user_id'=>$user->id,
         'post_id'=>$post->id
      ]);
    }
   
     return Responder::success('','success',200);
   }
   
   public function getLikedPosts(Request $request){
     $user=$request->user();
     $data=Like::whereBelongsTo($user,'user')->pluck('post_id');
     return Responder::success($data,'success',200);
   }


}
