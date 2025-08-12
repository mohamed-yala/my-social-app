<?php

namespace App\Http\Controllers;

use App\Helpers\Responder;
use App\Models\Follower;
use Illuminate\Http\Request;

class followerController extends Controller
{
    public function follow(Request $request,$id){
      $user=$request->user();
      $exist=Follower::where(['user_id'=>$user->id,'following_id'=>$id])->exists();
      if($exist){
        Follower::where(['user_id'=>$user->id,'following_id'=>$id])->delete();
      }else{
        $user->followers()->create([
          'following_id'=>$id
        ]);
      }
      return Responder::success('','success',200);
    }
}
