<?php

use App\Http\Controllers\ResumeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'cv'], function() {
    Route::get('/', [ResumeController::class, 'list']);
    Route::get('/{id}', [ResumeController::class, 'detail']);
    Route::post('/', [ResumeController::class, 'store']);
    Route::post('/{id}', [ResumeController::class, 'edit']);
    Route::post('/{id}/status', [ResumeController::class, 'updateStatus']);
});
