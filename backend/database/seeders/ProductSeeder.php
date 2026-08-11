<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::whereNotNull('parent_id')->get();

        if ($categories->isEmpty()) {
            return;
        }

        $dummyProducts = [
            [
                'name' => 'Snoo Smart Sleeper Bassinet',
                'description' => 'The safest, most effective baby bed ever made.',
                'image_url' => 'https://images.unsplash.com/photo-1595930920038-f99a4c5eb448?q=80&w=600&auto=format&fit=crop',
                'is_recommended' => true,
                'min_price' => 1695.00,
                'max_price' => 1695.00,
                'cat_index' => 0, // Nursery -> Cribs
            ],
            [
                'name' => 'UPPAbaby Vista V2 Stroller',
                'description' => 'Premium travel system that grows with your family.',
                'image_url' => 'https://images.unsplash.com/photo-1544299839-826640dae3b6?q=80&w=600&auto=format&fit=crop',
                'is_recommended' => true,
                'min_price' => 999.99,
                'max_price' => 1099.99,
                'cat_index' => 5, // Travel -> Strollers
            ],
            [
                'name' => 'Stokke Tripp Trapp High Chair',
                'description' => 'The chair that grows with the child.',
                'image_url' => 'https://images.unsplash.com/photo-1519782522736-2580df3e48d3?q=80&w=600&auto=format&fit=crop',
                'is_recommended' => true,
                'min_price' => 299.00,
                'max_price' => 319.00,
                'cat_index' => 10, // Feeding -> High Chairs
            ],
            [
                'name' => 'Dr. Brown\'s Natural Flow Anti-Colic Bottles',
                'description' => 'Reduces colic, spit-up, burping and gas.',
                'image_url' => 'https://images.unsplash.com/photo-1628198754117-646e7f7b11d9?q=80&w=600&auto=format&fit=crop',
                'is_recommended' => false,
                'min_price' => 24.99,
                'max_price' => 29.99,
                'cat_index' => 11, // Feeding -> Bottles
            ],
            [
                'name' => 'Hatch Rest+ Baby Sound Machine',
                'description' => 'Sound machine, night light, time-to-rise, and audio monitor.',
                'image_url' => 'https://images.unsplash.com/photo-1595166258097-b2ebbb410972?q=80&w=600&auto=format&fit=crop',
                'is_recommended' => true,
                'min_price' => 89.99,
                'max_price' => 89.99,
                'cat_index' => 4, // Nursery -> Monitors
            ]
        ];

        foreach ($dummyProducts as $data) {
            $catId = isset($categories[$data['cat_index']]) ? $categories[$data['cat_index']]->id : $categories->first()->id;

            $product = Product::create([
                'category_id' => $catId,
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'description' => $data['description'],
                'image_url' => $data['image_url'],
                'is_recommended' => $data['is_recommended'],
                'min_price' => $data['min_price'],
                'max_price' => $data['max_price'],
            ]);

            // Create Buying Options
            $product->buyingOptions()->createMany([
                [
                    'retailer_name' => 'Amazon',
                    'url' => 'https://amazon.com',
                    'price' => $data['min_price'],
                    'is_primary' => true,
                ],
                [
                    'retailer_name' => 'Target',
                    'url' => 'https://target.com',
                    'price' => $data['max_price'],
                    'is_primary' => false,
                ]
            ]);

            // Create Product Specs
            $product->specs()->createMany([
                ['spec_name' => 'Dimensions', 'spec_value' => '30 x 20 x 15 inches'],
                ['spec_name' => 'Weight', 'spec_value' => '15 lbs'],
                ['spec_name' => 'Age Range', 'spec_value' => '0-6 months']
            ]);
        }
    }
}
