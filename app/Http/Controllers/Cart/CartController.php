<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index() {
        return inertia("Products/CartPanel", [
            "cart_content" => Cart::content()
        ]);
    }

    public function cartCount() {        
        return response()->json(["cart_count"=> Cart::count()]);
    }

    public function add(Request $request) {
        $request->validate([
            "product_id" => ['required'],
            "quantity" => ["required"],
        ]);

        $product = Product::with("images")->findOrFail( $request->product_id );
        
        Cart::add($product->id, $product->name, $request->quantity, $product->price, 0, [
            "image" => $product->images[0]->url
        ]);

        return response()->json([
            "cart_count" => Cart::count()
        ]);
    }

    public function remove(string $rowId) {
        Cart::remove($rowId);

        return to_route('cart.index');
    }
}
