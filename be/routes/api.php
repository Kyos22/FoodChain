<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UnitController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// Route::middleware('jwt.auth')->get('/user', function () {
//     return response()->json(Auth::user());
// });
// //AuthController
// Route::prefix('auth')->group(function(){
//     Route::post('/login', [AuthController::class, 'Login']); 
//     Route::post('/logout', [AuthController::class, 'Logout']); 
// });

// Route::middleware('jwt.auth')->get('/mee', [AuthController::class, 'me']);

Route::group([
    // 'middleware' => 'api',
    'prefix' => 'auth',
], function ($router) {
    Route::post('/login', [AuthController::class, 'Login'])->name('login');
    Route::post('/logout', [AuthController::class, 'Logout'])->middleware('auth:api')->name('logout');
    Route::post('/me', [AuthController::class, 'me'])->middleware(JwtMiddleware::class)->name('me');
    

});

Route::prefix('account')->group(function(){
    Route::get('/get', [AccountController::class, 'getAccount'])->name('account.index');
    Route::get('/getAccountById/{id}', [AccountController::class, 'GetAccountById']);  
    Route::get('/findByFullname/{searchName}', [AccountController::class, 'FindByFullName']);
    Route::get('/findByUsername/{searchName}', [AccountController::class, 'FindByUserName']);
    Route::get('/findByRole/{id}', [AccountController::class, 'FindByRole']);
    Route::put('/edit/{id}', [AccountController::class, 'updateAccount']);  
    Route::put('/updateStatusAccount/{id}', [AccountController::class, 'UpdateStatusAccount']);
    Route::post('/register', [AccountController::class, 'Register']);  
    Route::post('/login', [AccountController::class, 'Login']); 
    Route::delete('/delete/{id}', [AccountController::class, 'DeleteAccount']);   
});

//RoleController
Route::prefix('role')->group(function(){
    Route::post('/addRole ', [RoleController::class, 'addRole']);  
    Route::get('/getRoleByIdRole/{id}', [RoleController::class, 'GetRoleByUserId']);
    Route::get('/getRoleByIdRole/{id}', [RoleController::class, 'GetRoleByUserId']);
    Route::get('/get', [RoleController::class, 'GetAllRoles']);
});

//UnitController
Route::prefix('unit')->group(function(){
    Route::get('/get', [UnitController::class, 'GetUnits']);
    Route::post('/create', [UnitController::class, 'AddUnit']);
});
//CategoryController
Route::prefix('category')->group(function(){
    Route::get('/get', [CategoriesController::class, 'GetCategories']);
    Route::post('/create', [CategoriesController::class, 'AddCategory']);
});
//CategoryController
Route::prefix('supplier')->group(function(){
    Route::get('/get', [SupplierController::class, 'GetSuppliers']);
    Route::post('/create', [SupplierController::class, 'AddSupplier']);
});
//ProductController
Route::prefix('product')->group(function(){
    Route::get('/get', [ProductController::class, 'GetAll']);
    Route::post('/create', [ProductController::class, 'Create']);
});


