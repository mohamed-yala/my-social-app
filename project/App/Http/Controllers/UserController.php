<?php

namespace App\Http\Controllers;

use App\Helpers\Responder;
use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(Request $request){
      $user=$request->user();
      $following=Follower::where('user_id',$user->id)->pluck('following_id')->toArray();
      $array=array_merge([$user->id],$following);
      $data=User::whereNotIn('id',$array)->cursorPaginate(4);
      return Responder::success($data,'success',200);

    }
}
