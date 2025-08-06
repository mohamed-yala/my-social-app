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

 

}
