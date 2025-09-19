<?php

 namespace App\Helpers;

class Responder {

  public static function success($data=null,$message='Success',$code=200){
      return response([
         'status'=>true,
         'message'=>$message,
         'data'=>$data
      ],$code);
  }

  public static function unauthorized($message,$code=403){
    return response([
      'status'=>false,
      'message'=>$message
    ],$code);
  }
  public static function validationErr($message,$code=422){
    return response([
      'status'=>false,
      'message'=>$message
    ],$code);
  }

 

}
