<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follower;
use App\Helpers\Responder;
use Illuminate\Http\Request;

class followerController extends Controller
{
    public function follow(Request $request,$id){
      $user=$request->user();
      $followed=User::findOrFail($id);
      $exist=Follower::where(['user_id'=>$user->id,'following_id'=>$id])->exists();
      if($exist){
        Follower::where(['user_id'=>$user->id,'following_id'=>$id])->delete();
        $user->decrement('nbfollowing');
        $followed->decrement('follower');
      }else{
        $user->followers()->create([
          'following_id'=>$id
        ]);
         $user->increment('nbfollowing');
        $followed->increment('follower');
      }
      return Responder::success('','success',200);
    }
}
