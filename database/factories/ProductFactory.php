<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->sentence(),
            "slug" => $this->faker->slug(5),
            "price" => random_int(10, 100),
            "description" => $this->faker->sentence(4),
            "note" => random_int(1, 5),
            "quantity" => 20,
            "brand_id" => 1,          

        ];
    }
}
