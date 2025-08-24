<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use App\Helpers\Responder;
use Illuminate\Http\Request;
use App\Http\Requests\postRequest;
use App\Http\Requests\CommentRequest;
use App\Models\Follower;
use GrahamCampbell\ResultType\Success;

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

   public function getPosts(Request $request,$id){
      $visitor=$request->user();
      $user=User::findOrFail($id);
      $exits=Follower::where(['user_id'=>$visitor->id,'following_id'=>$user->id])->exists();
      if($user->visibility=='private' && !$exits){
        return Responder::unauthorized('private account',403);
      }
      $data=$user->post()->with('user')->cursorPaginate(5);
      return Responder::success($data,'success',200);
   }
    public function getAllPosts(){

       $data=Post::with('user')->orderBy('created_at','desc')->cursorPaginate(5);
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
   
   public function getLikedPosts(Request $request,$id){
     $user=User::findOrFail($id);
     $data=Like::whereBelongsTo($user,'user')->pluck('post_id');
     return Responder::success($data,'success',200);
   }

   public function addComment(CommentRequest $request,$id){

    $data=$request->validated();
    $user=$request->user();
    $post=Post::findOrFail($id);
   $comment = $user->comment()->create([
      'text'=>$data['text'],
      'post_id'=>$id
    ]);
    $post->increment('comments');
    $comment->load('user');

    return Responder::success($comment,'success',201);
   }

   public function getComments($id){
    $post=Post::findOrFail($id);
    $comments=$post->comment()->with('user')->get();
    return Responder::success(['post'=>$post,'comments'=>$comments],'success',200);
   }


}
