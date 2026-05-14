<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
Route::resource('/auth', TaskController::class)
    ->only(['login', 'register']);
*/

Route::get('/', [TaskController::class, 'index']);

Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/auth/register', [UserController::class, 'register']);
