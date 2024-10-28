<?php

namespace App\Http\Controllers;

use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Stripe\Charge;
use Stripe\Stripe;

class PayementController extends Controller
{
    public function __construct() {
        $this->middleware("auth");
    }

    public function checkout() {        
        
        return inertia('Products/Checkout');
    }

    public function payement(Request $request) {
        
        Stripe::setApiKey(config('services.stripe.secret'));
        $cart_content = Cart::content()->toArray(); // Convert Collection to Array
        $total_price = array_reduce($cart_content, function ($carry, $item) {
            return $carry + $item['price'] * $item['qty'];
        }, 0);

        try {
            Charge::create([
                'amount' => $total_price * 100,
                'currency' => 'usd',
                'source' => $request->stripeToken,
                'description' => 'paiement du produit',
            ]);
            Cart::destroy();
            // Redirection d'Inertia en cas de succès
            return redirect()->route('payment.check')->with('success', 'Paiement réussi');
        } catch (\Exception $e) {
            // Redirection d'Inertia en cas d'erreur
            return redirect()->route('payment.check')->with('error', 'Erreur lors du paiement : ' . $e->getMessage());
        }
    }

}
