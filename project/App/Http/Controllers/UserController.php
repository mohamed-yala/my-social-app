<?php

namespace App\Http\Controllers;

use App\Helpers\Responder;
use App\Http\Requests\EditRequest;
use App\Http\Requests\SearchRequest;
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

    public function getUser(Request $request,$id){
      $vistor=$request->user();
      $user=User::findOrfail($id);
      $following=Follower::where('user_id',$vistor->id)->pluck('following_id');
      return Responder::success(['user'=>$user,'following'=>$following],'success',200);
    }
    
    public function searchUsers(SearchRequest $request){
     
       $validated=$request->validated();
       $data=User::where('name','like','%' . $validated['search'] . '%')->get();
      return  Responder::success($data,'success',200);
    }

    public function editUser(EditRequest $request,User $user){
      $data=$request->validated();  
      if($request->hasFile('ppicture')){
        $data['ppicture']= $request->file('ppicture')->store('profilePictures','public');
      }
   
      $user->update($data);
    return Responder::success($user,'success',200);
    }
    
}
