<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\JobPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('jobs', [JobPostController::class, 'alljobs']);
    Route::post('jobs', [JobPostController::class, 'store']);
    Route::get('jobs/{id}', [JobPostController::class, 'details']);
    Route::put('jobs/{id}', [JobPostController::class, 'update']);
    Route::delete('jobs/{id}', [JobPostController::class, 'delete']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
});
