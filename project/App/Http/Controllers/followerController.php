<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follower;
use App\Helpers\Responder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FollowerController extends Controller
{
   use AuthorizesRequests;
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

    public function getFollowers(User $user){
     $followers=Follower::where('following_id',$user->id)->with('user')->get()->pluck('user');
     return Responder::success($followers,'success',200);
    } 

    public function getFollowing(User $user){
     $this->authorize('visit',$user);
     $following=$user->followers()->pluck('following_id')->toArray();
     $data=User::whereIn('id',$following)->get();
     return Responder::success($data,'success',200);
    }

}
