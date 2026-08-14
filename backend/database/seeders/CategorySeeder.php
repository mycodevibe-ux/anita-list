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
                'name' => 'Transport',
                'description' => 'Strollers, car seats, carriers, and pushchairs.',
                'image_url' => '/images/banner4.jpg',
                'subcategories' => [
                    'Pushchairs',
                    'Car Seats',
                    'Baby Carriers',
                    'Newborn car seats',
                    'Car seat bases',
                    'Car seat accessories',
                    'Carrycots and seats',
                    'Rain covers',
                    'Mosquito nets',
                    'Footmuffs',
                    'Sheepskin liners',
                    'Liners & snugglers'
                ]
            ],
            [
                'name' => 'Baby clothing',
                'description' => 'Sleepsuits, bodysuits, sun hats, and scratch mittens.',
                'image_url' => '/images/baby-clothing.png',
                'subcategories' => [
                    'Newborn Sleepsuits',
                    'Bodysuits & Onesies',
                    'Scratch Mittens',
                    'Sun Hats',
                    'Booties & Socks',
                    'Toddler Clothing'
                ]
            ],
            [
                'name' => 'Bathing',
                'description' => 'Baby baths, towels, bath seats, and sponge care.',
                'image_url' => '/images/bathing.png',
                'subcategories' => [
                    'Baby Baths',
                    'Bath Seats',
                    'Hooded Towels',
                    'Bath Sponges & Care'
                ]
            ],
            [
                'name' => 'Bedding',
                'description' => 'Cribs, Moses baskets, mattresses, and fitted sheets.',
                'image_url' => '/images/bedding.png',
                'subcategories' => [
                    'Moses Baskets',
                    'Cribs & Bassinets',
                    'Fitted Sheets',
                    'Sleeping Bags & Swaddles',
                    'Mattresses'
                ]
            ],
            [
                'name' => 'Cleaning',
                'description' => 'Sterilizers, bottle washers, and hygiene gear.',
                'image_url' => '/images/banner5.jpg',
                'subcategories' => [
                    'Electric Sterilizers',
                    'Microwave Sterilizers',
                    'Bottle Washers'
                ]
            ],
            [
                'name' => 'Feeding and weaning',
                'description' => 'Bottles, high chairs, breast pumps, and weaning accessories.',
                'image_url' => '/images/hero-1.jpg',
                'subcategories' => [
                    'Bottles & Teats',
                    'High Chairs',
                    'Breast Pumps',
                    'Weaning Sets',
                    'Bibs'
                ]
            ],
            [
                'name' => 'Monitors',
                'description' => 'Video baby monitors, audio monitors, and digital thermometers.',
                'image_url' => '/images/banner1.jpg',
                'subcategories' => [
                    'Video Monitors',
                    'Audio Monitors',
                    'Thermometers',
                    'Movement Monitors'
                ]
            ],
            [
                'name' => 'Mothers',
                'description' => 'Maternity pillows, postpartum care, and nursing gear.',
                'image_url' => '/images/anita.png',
                'subcategories' => [
                    'Maternity Pillows',
                    'Postpartum Care',
                    'Nursing Bras & Covers'
                ]
            ],
            [
                'name' => 'Nappies & lotions',
                'description' => 'Eco nappies, baby wipes, organic lotions, and barrier creams.',
                'image_url' => '/images/banner3.jpg',
                'subcategories' => [
                    'Nappies & Diapers',
                    'Wipes',
                    'Baby Lotions & Oils',
                    'Nappy Creams'
                ]
            ],
            [
                'name' => 'Nursery',
                'description' => 'Storage, wall decor, night lights, and mobiles.',
                'image_url' => '/images/hero-2.jpg',
                'subcategories' => [
                    'Nursery Storage',
                    'Decor & Wall Art',
                    'Night Lights',
                    'Mobiles'
                ]
            ],
            [
                'name' => 'Toys & play',
                'description' => 'Play mats, bouncers, wooden teethers, and plush toys.',
                'image_url' => '/images/banner2.jpg',
                'subcategories' => [
                    'Baby Bouncers',
                    'Play Mats & Gyms',
                    'Teethers & Rattles',
                    'Plush Toys'
                ]
            ],
            [
                'name' => 'Gift ideas',
                'description' => 'Baby shower gifts, memory books, and keepsakes.',
                'image_url' => '/images/banner4.jpg',
                'subcategories' => [
                    'Gift Sets',
                    'Keepsakes',
                    'Story Books',
                    'Gift Cards'
                ]
            ],
        ];

        foreach ($categories as $catData) {
            $parent = Category::firstOrCreate(
                ['slug' => Str::slug($catData['name'])],
                [
                    'name' => $catData['name'],
                    'description' => $catData['description'],
                    'image_url' => $catData['image_url'],
                    'parent_id' => null,
                ]
            );

            // Ensure parent image_url is populated
            if (!$parent->image_url) {
                $parent->update(['image_url' => $catData['image_url']]);
            }

            foreach ($catData['subcategories'] as $subName) {
                Category::firstOrCreate(
                    ['slug' => Str::slug($subName)],
                    [
                        'name' => $subName,
                        'parent_id' => $parent->id,
                        'image_url' => $catData['image_url'],
                    ]
                );
            }
        }
    }
}
