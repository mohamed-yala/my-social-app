<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helpers\Responder;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
      $data = $request->validated();
      $user = User::create([
        'name'=>$data['name'],
        'email'=>$data['email'],
        'password'=>bcrypt($data['password'])
      ])->fresh();
      
      $token=$user->createToken('main')->plainTextToken;
      return Responder::success(['token'=>$token,'user'=>$user],'success',201);
    }
    
    public function login(LoginRequest $request){
       $credentiels=$request->validated();
       if(!Auth::attempt($credentiels)){
        return Responder::validationErr('Provided email or password is incorrect',401);
       }
       $user=Auth::user();
       /**@var \App\Models\User $user */
       $token=$user->createToken('main')->plainTextToken;
       
       return Responder::success(['token'=>$token,'user'=>$user],'success',200);
    }
    
    public function logout(Request $request){
      $user=$request->user();
      $user->currentAccessToken()->delete();
      return Responder::success('','success',204);

    }
}
