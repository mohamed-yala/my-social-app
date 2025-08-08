<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    public $timestamps = false;

     protected $fillable = [
        'picture',
        'description' 
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function comment(){
       return $this->hasMany(Comment::class);
    }
    

}
