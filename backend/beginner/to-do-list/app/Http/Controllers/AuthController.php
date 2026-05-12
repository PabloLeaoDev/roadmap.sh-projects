<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->back()->with("error","");
        }
        $user->password = bcrypt($request->password);
        
    }

    public function register(Request $request)
    {
        //
    }
}
