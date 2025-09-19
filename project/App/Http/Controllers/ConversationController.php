<?php

namespace App\Http\Controllers;

use Algolia\AlgoliaSearch\Model\Analytics\OrderBy;
use App\Models\User;
use App\Models\Group;
use App\Models\Message;
use App\Helpers\Responder;
use Illuminate\Support\Str;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Events\SocketMessage;
use App\Models\MessageAttachment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreMessageRequest;

class ConversationController extends Controller
{
    public function getConversations(Request $request){
        $user=$request->user();
        return Responder::success($user->id ? Conversation::getConversationsForSidebar($user):[],'success',200);
    }

    public function getGrpMsgs($id){
       $group=Group::with(['messages' => function($q){$q->orderBy('created_at','desc');},'messages.sender'])->findOrFail($id);
       return Responder::success($group,'success',200) ;
    }
  
     public function getUserMsgs(Request $request,$id){
        $user=$request->user();
        $friend=User::findOrFail($id);
       $msgs = Message::with('sender')
    ->where(function ($query) use ($user, $id) {
        $query->where(function ($q) use ($user, $id) {
            $q->where('sender_id', $user->id)
              ->where('receiver_id', $id);
        })
        ->orWhere(function ($q) use ($user, $id) {
            $q->where('sender_id', $id)
              ->where('receiver_id', $user->id);
        });
    })->OrderBy('created_at','desc')->cursorPaginate(40);
        
        return Responder::success(['messages'=>$msgs,'friend'=>$friend,'cursor'=>$request->cursor],'success',200) ;
    }


   

}
