<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ImageProduct;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Brand::factory(4)->create();
        // Category::factory(2)
        // ->has(
        //     SubCategory::factory(4) ,
        //     'sub_categories'
        //     )           
        //     ->create();
            
        // Product::factory(1)
        // // ->has(
        // //     ImageProduct::factory(4)
        // //     ->hasAttached(Tag::factory(3)->create())
        // // )
        // ->create();
        Category::factory(2)->has(
            SubCategory::factory(4)->has(
                Product::factory(5)->has(
                    ImageProduct::factory(4), "images"
                )->hasAttached(
                    Tag::factory(3)->create()
                )
            , "products")
        , "sub_categories")->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
