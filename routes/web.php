<?php

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\PayementController;
use Gloudemans\Shoppingcart\Facades\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/product', [ProductController::class, 'index'])->name('shop');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [PayementController::class,'checkout'])->name('payment.index');
    Route::post('/checkout', [PayementController::class,'payement'])->name('payment.check');

});

Route::get('/panel', [CartController::class, 'index'])->name('cart.index');
Route::get('/panel/delete/{rowId}', [CartController::class, 'remove'])->name('cart.remove');

Route::get('/destroy-cart', function() {
    Cart::destroy();
});

Route::prefix('api')->group(function () {
    Route::get('/shop', [ProductController::class, 'search'])->name('api.shop');
    Route::get('/cart/count', [CartController::class, 'cartCount'])->name('cart.count');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');

});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
