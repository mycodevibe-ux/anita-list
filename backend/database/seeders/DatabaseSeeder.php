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
                'hero_title' => 'Helping you choose the right baby essentials, based on *decades of trusted expertise.*',
                'hero_subtitle' => 'Discover baby essentials, seek advice and curate a list that feels right for you and your future little one.',
                'hero_title_2' => 'Curate lists together with friends, family and *your loved ones.*',
                'hero_subtitle_2' => 'Share your registry links easily and coordinate gifts seamlessly.',
                'hero_title_3' => 'Find expert suggestions for every stage of *your parenting journey.*',
                'hero_subtitle_3' => 'From newborn clothes to monitors and travel gear, we have you covered.',
                'expert_advice_title' => 'Personalised advice based on years of experience',
                'expert_advice_description' => "Anita's list was created to strip away the noise and bring clarity to baby shopping.",
            ]
        );

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
