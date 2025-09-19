<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Follower;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
      
    }

    public function update(User $user,User $eidtedProfile){
      return $user->id==$eidtedProfile->id;
    }

     public function visit(User $user,User $profile){
      $exist=Follower::where(['user_id'=>$user->id,'following_id'=>$profile->id])->exists();
      return $profile->visibility==='public' || $exist;
    }
    
}
