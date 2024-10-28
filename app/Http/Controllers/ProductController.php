<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

/**
 * Gère les opérations liées aux produits.
 */
class ProductController extends Controller
{
    
    /**
     * Affiche la page principale des produits.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request) {
        
  // Récupère les paramètres de recherche
  $query = $request->input('query', '');
  $subCategories = $request->input('subCategories', '');
  
  
  // Traite les sous-catégories
  $subCategories = $subCategories ? explode(',', $subCategories) : [];
  $subCategories = array_filter(array_map('trim', $subCategories));

  // Construit la requête de recherche
  $products = Product::query()
      // Filtre par nom ou description si une requête est fournie
      ->when($query, function ($q) use ($query) {
          $q->where(function ($subQ) use ($query) {
              $subQ->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhereHas("tags", function ($tags) use ($query) {
                      $tags->where("name", "like", $query);
                  })
                  ;
          });
          
      })
      // Filtre par sous-catégories si spécifiées
      ->when(!empty($subCategories), function ($q) use ($subCategories) {
          $q->whereHas('subCategory', function ($subQ) use ($subCategories) {
              $subQ->whereIn('id', $subCategories);
          });
      }, function ($q) {              
          return $q;
      })
      // Charge les relations nécessaires
      ->with(['brand', 'images', 'tags', 'subCategory'])
      // Pagine les résultats
      ->paginate(9);

        // Récupère toutes les catégories avec leurs sous-catégories
        $categories = Category::with('sub_categories')->get();
        

        // Rend la vue 'Shop' avec les données
        return Inertia::render('Shop', [
            'initialProducts' => $products,
            'categories' => $categories
        ]);
    }

   
    public function show(string $slug) 
    {
        $product = Product::where("slug", $slug)
        ->with('images')
        ->firstOrFail();

        return Inertia::render("Products/Show", [
            "product"=> $product
        ]);
    }
}
