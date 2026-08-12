<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@anitaslist.com'],
            [
                'name' => 'Main Admin',
                'password' => bcrypt('admin123'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );

        \App\Models\HomePageSetting::firstOrCreate(
            ['id' => 1],
            [
                'hero_slides' => [
                    [
                        'title' => 'Helping you choose the right baby essentials, based on *decades of trusted expertise.*',
                        'subtitle' => 'Discover baby essentials, seek advice and curate a list that feels right for you and your future little one.',
                        'image' => null,
                    ],
                ],
                'hero_title' => 'Helping you choose the right baby essentials, based on *decades of trusted expertise.*',
                'hero_subtitle' => 'Discover baby essentials, seek advice and curate a list that feels right for you and your future little one.',
                'expert_advice_title' => 'Personalised advice based on years of experience',
                'expert_advice_description' => "Anita's list was created to strip away the noise and bring clarity to baby shopping.",
            ]
        );

        \App\Models\SiteSetting::firstOrCreate(
            ['id' => 1],
            [
                'site_name' => "anita's list",
                'announcement_text' => "Anita's List - Choose, organise and buy your baby kit",
                'header_links' => [
                    ['label' => 'Products', 'href' => '/products'],
                    ['label' => 'Expert advice', 'href' => '/expert-advice'],
                    ['label' => 'About', 'href' => '/about'],
                    ['label' => 'Contact', 'href' => '/contact'],
                ],
                'header_cta_label' => 'My lists',
                'header_cta_href' => '/hub/lists',
                'footer_logo_symbol' => 'a',
                'footer_newsletter_title' => 'BE IN THE KNOW',
                'footer_newsletter_subtitle' => 'Be the first to know about new collections, news and *exclusive offers*',
                'footer_copyright' => '@2026, Anita\'s List',
                'login_badge' => 'WELCOME BACK TO ANITA\'S LIST',
                'login_title' => 'Sign in to access your curated lists & recommendations.',
                'login_button_text' => 'Sign in',
            ]
        );

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
