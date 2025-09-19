<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
<<<<<<< HEAD
use Laravel\Scout\Searchable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
=======
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use Searchable,HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
<<<<<<< HEAD
        'ppicture',
=======
        'pPicture',
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
        'visibility',
        'email_verified_at',
         'is_admin'
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function post(){
        return $this->hasMany(Post::class);
    }
    public function comment(){
          return $this->hasMany(Comment::class);
    }
    public function followers(){
          return $this->hasMany(Follower::class);
    }
    public function like(){
        return $this->hasMany(Like::class);
    }
    public function groups(){
       return $this->belongsToMany(Group::class,'group_users');
    }
<<<<<<< HEAD

    public static function getUsersExceptUser(User $exceptUser){
     $userId=$exceptUser->id;
     $query=User::select(['users.*','messages.message as last_message','messages.created_at as last_message_date'])
     ->where('users.id','!=',$userId)
     ->join('conversations', function($join) use ($userId) {
    $join->where(function ($q) use ($userId) {
        $q->where(function($q2) use ($userId) {
            $q2->on('conversations.user_id1','=','users.id')
               ->where('conversations.user_id2','=',$userId);
        })
        ->orWhere(function($q2) use ($userId) {
            $q2->on('conversations.user_id2','=','users.id')
               ->where('conversations.user_id1','=',$userId);
        });
    });
})
    ->leftJoin('messages','messages.id','=','conversations.last_message_id')
     ->orderBy('messages.created_at','desc')
     ->orderBy('users.name'); 
     return $query->get();
    }

    public function toConversationArray(){
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'is_group'=>false,
            'is_user'=>true,
            'is_admin'=>(bool) $this->is_admin,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'blocked_at'=>$this->blocked_at,
            'last_message'=>$this->last_message,
            'last_message_date'=>$this->last_message_date,
            'ppicture'=>$this->ppicture
        ];
    }
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
}
