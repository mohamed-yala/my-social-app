<?php

<<<<<<< HEAD
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('online', function ($user) {
    return $user; 
});

Broadcast::channel('message.user.{userId1}-{userId2}',function(User $user,int $userId1,int $userId2){
    return $user->id ===$userId1 || $user->id ===$userId2 ? $user : null;
});

Broadcast::channel('message.group.{groupId}',function(User $user,int $groupId){
  return $user->groups->contains('id',$groupId) ? $user :null;
=======
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
});
