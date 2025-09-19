<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;

    protected $fillable=[
        'message',
        'sender_id',
        'group_id',
<<<<<<< HEAD
        'receiver_id'
=======
        'receiver_id '
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    ];
  public function sender(){
    return $this->belongsTo(User::class,'sender_id');
  }
  public function receiver(){
    return $this->belongsTo(User::class,'receiver_id');
  }
  public function group(){
    return $this->belongsTo(Group::class);
  }
  public function attachments(){
    return $this->hasMany(MessageAttachment::class);
  }
<<<<<<< HEAD
  
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
}
