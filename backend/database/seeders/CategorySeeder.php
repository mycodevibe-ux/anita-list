<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Nursery & Decor',
                'description' => 'Everything you need to create a beautiful nursery.',
                'image_url' => 'https://images.unsplash.com/photo-1595930920038-f99a4c5eb448?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Cribs', 'Bedding', 'Decor', 'Storage', 'Monitors']
            ],
            [
                'name' => 'Travel',
                'description' => 'Strollers, car seats, and on-the-go essentials.',
                'image_url' => 'https://images.unsplash.com/photo-1544299839-826640dae3b6?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Strollers', 'Car Seats', 'Baby Carriers', 'Diaper Bags', 'Travel Accessories']
            ],
            [
                'name' => 'Feeding',
                'description' => 'Bottles, high chairs, and mealtime supplies.',
                'image_url' => 'https://images.unsplash.com/photo-1519782522736-2580df3e48d3?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['High Chairs', 'Bottles', 'Breastfeeding', 'Pacifiers', 'Toddler Feeding']
            ],
            [
                'name' => 'Bath & Health',
                'description' => 'Tub time and baby care essentials.',
                'image_url' => 'https://images.unsplash.com/photo-1595166258097-b2ebbb410972?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Bathtubs', 'Towels', 'Skincare', 'Health & Safety', 'Potty Training']
            ],
            [
                'name' => 'Clothing',
                'description' => 'Adorable apparel for newborns and toddlers.',
                'image_url' => 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Bodysuits', 'Sleepwear', 'Tops', 'Bottoms', 'Accessories']
            ],
            [
                'name' => 'Toys & Learning',
                'description' => 'Educational toys and play mats.',
                'image_url' => 'https://images.unsplash.com/photo-1560021319-3bfec9ed93c8?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Activity Centers', 'Bouncers', 'Plush Toys', 'Books', 'Learning Toys']
            ],
            [
                'name' => 'Gifts',
                'description' => 'Perfect presents for baby showers.',
                'image_url' => 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
                'subcategories' => ['Gift Sets', 'Keepsakes', 'Gift Cards']
            ]
        ];

        foreach ($categories as $catData) {
            $parent = Category::create([
                'name' => $catData['name'],
                'slug' => Str::slug($catData['name']),
                'description' => $catData['description'],
                'image_url' => $catData['image_url'],
                'parent_id' => null,
            ]);

            foreach ($catData['subcategories'] as $subName) {
                Category::create([
                    'name' => $subName,
                    'slug' => Str::slug($subName),
                    'parent_id' => $parent->id,
                ]);
            }
        }
    }
}
