<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Helpers\Responder;
use App\Models\Message;
use Illuminate\Support\Str;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Workbench\App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Group;
use App\Models\MessageAttachment;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request){
       $data=$request->validated();
       $data['sender_id']=Auth::id();
       $receiverId=$data['receiver_id'] ?? null;
       $groupId=$data['group_id'] ?? null;

       $files=$data['attachments'] ?? [];
       
       $message=Message::create($data)->load('sender');

       $attachments=[];
       if($files){
         foreach($files as $file){
           $directory='attachments/' . Str::random(32);
           Storage::makeDirectory($directory);

           $model =[
            'message_id'=>$message->id,
            'name'=>$file->getClientOriginaleName(),
            'mime'=>$file->getClientMimeType(),
            'size'=>$file->getSize(),
            'path'=>$file->store($directory,'public')
           ];
           $attachment=MessageAttachment::create($model);

         }
           $message->attachments=$attachments;
       }
     
       if($receiverId){
         Conversation::updateConversationWithMessage($receiverId,Auth::id(),$message);
       }

       if($groupId){
        Group::updateGroupWithMessage($groupId,$message);
       }

       SocketMessage::dispatch($message);
       return response(['message'=>$message]);

    }

    public function destroy(Message $message){
        if($message->sender_id !==Auth::id()){
            return Responder::unauthorized('Forbidden',403);
        }
        $message->delete();
        return response('',204);
    }

}
