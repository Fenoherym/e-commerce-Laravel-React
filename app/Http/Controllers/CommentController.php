<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index() {
        $comments = Comment::latest()->paginate(10);

        return response()->json([
            "comments" => $comments
        ]);
    }

    public function store(Request $request) {      
      
        $comment = $request->validate([            
            "name"=> ['required', 'min:3'],
            "email" => ['required', 'email'],
            "content" => ["required", 'min:3'],
            "note" => ['required', 'integer', 'between:1,5'],
            "product_id" => ['required', 'exists:products,id'],
        ]);        
        
        try {
            Comment::create($comment);
            return response()->json([
                'status'=> 'success',
                'message'=> 'Commentaire ajoutée'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status'=> 'error',
                'message' => "une erreur c'est produite"
            ]);
        }
    }
}
