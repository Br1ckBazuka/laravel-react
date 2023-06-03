<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});
Route::get('/random-data', function () {
    $users = User::inRandomOrder()->limit(5)->get();
    $categories = Category::inRandomOrder()->limit(5)->get();
    $products = Product::inRandomOrder()->limit(5)->get();

    return response()->json([
        'users' => $users,
        'categories' => $categories,
        'products' => $products,
    ]);
});
Route::get('/products', 'App\Http\Controllers\ProductsController@index');
Route::get('/categories', 'App\Http\Controllers\CategoriesController@index');
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
