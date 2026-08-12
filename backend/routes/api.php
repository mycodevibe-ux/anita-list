<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserListController;
use App\Http\Controllers\Api\UserListItemController;
use App\Http\Controllers\Api\KeyDateController;
use App\Http\Controllers\Api\NoteController;

use App\Http\Controllers\Api\PageController;

// Auto-restore safeguard for Main Admin user
if (\Illuminate\Support\Facades\Schema::hasTable('users')) {
    $admin = \App\Models\User::where('email', 'admin@anitaslist.com')->first();
    if (!$admin) {
        $admin = new \App\Models\User();
        $admin->name = 'Main Admin';
        $admin->email = 'admin@anitaslist.com';
        $admin->password = 'admin123';
        $admin->save();
    }
}

// Public Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Homepage Route
Route::get('/homepage', function () {
    // Auto-create pages table & home_page_settings extra columns if not present
    if (!\Illuminate\Support\Facades\Schema::hasTable('pages')) {
        \Illuminate\Support\Facades\Schema::create('pages', function ($table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->longText('content')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('side_image')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Seed initial static pages with full content
        $initialPages = [
            [
                'slug' => 'about',
                'title' => 'About Us',
                'subtitle' => 'Curated baby essentials based on trusted expertise',
                'content' => '<p>Anita\'s List was founded with a single mission: to bring clarity, calm, and genuine expert guidance to expectant parents navigating the overwhelming world of baby essentials.</p><p>With decades of experience as a maternity nurse and baby consultant, Anita handpicks and tests products to ensure only the highest quality, safest, and most practical gear makes the cut.</p><p>Our platform empowers parents to build personalized registries, coordinate gifts with family, and receive tailored advice at every stage of the journey.</p>',
            ],
            [
                'slug' => 'faq',
                'title' => 'Frequently Asked Questions',
                'subtitle' => 'Everything you need to know about Anita\'s List',
                'content' => '<h3>What is Anita\'s List?</h3><p>Anita\'s List is a comprehensive guide and registry builder designed by baby expert Anita. We help you choose the right baby essentials based on decades of trusted expertise, avoiding clutter and overwhelm.</p><h3>How do I create a registry?</h3><p>To create a registry, simply create an account, log in, navigate to your Hub, create a new list, and convert it into a shareable Registry.</p><h3>Are your product recommendations sponsored?</h3><p>No. Anita\'s product recommendations are entirely unbiased and based on years of hands-on experience as a maternity nurse and baby expert.</p><h3>Do you offer private consultations?</h3><p>Yes, Anita offers personalized 1-on-1 consultations to help you build your registry, plan your nursery, or prepare for postpartum life.</p>',
            ],
            [
                'slug' => 'expert-advice',
                'title' => 'Expert Advice',
                'subtitle' => 'Articles, guides, and trusted insights curated by Anita to help you navigate parenthood with confidence.',
                'content' => '<p>Welcome to Anita\'s Expert Advice section. Here you will find comprehensive guides on choosing the right stroller, packing your hospital bag, setting up your nursery, and selecting safe baby essentials.</p>',
            ],
            [
                'slug' => 'podcast',
                'title' => 'Anita\'s List Podcast',
                'subtitle' => 'Listen to expert advice, parent stories, and baby gear reviews on the go.',
                'content' => '<p>Join maternity nurse and baby expert Anita as she discusses nursery essentials, sleep training tips, postpartum recovery, and honest product reviews with guest experts and parents.</p>',
            ],
            [
                'slug' => 'work-with-us',
                'title' => 'Work With Us',
                'subtitle' => 'Partner with Anita\'s List to reach thousands of expectant and new parents.',
                'content' => '<p>We collaborate with premium, safety-focused baby brands that align with our mission of simplifying parenting. Whether you are interested in brand partnerships, product reviews, or affiliate opportunities, we would love to hear from you.</p>',
            ],
            [
                'slug' => 'privacy-policy',
                'title' => 'Privacy Policy',
                'subtitle' => 'How we collect, use, and protect your personal information.',
                'content' => '<p>At Anita\'s List, we take your privacy seriously. We collect personal information such as your name, email address, and list preferences strictly to provide and improve our services.</p><h3>Information We Collect</h3><p>We collect information you provide directly when registering an account, creating registries, or subscribing to our newsletter.</p><h3>How We Use Your Data</h3><p>Your data is used to customize your user experience, manage registries, and send important updates regarding your account.</p>',
            ],
            [
                'slug' => 'terms-of-service',
                'title' => 'Terms of Service',
                'subtitle' => 'Rules and guidelines for using Anita\'s List website and services.',
                'content' => '<p>By accessing or using Anita\'s List, you agree to comply with and be bound by these Terms of Service.</p><h3>Use of Our Platform</h3><p>You may use our platform to browse product recommendations, create baby registries, and access expert advice for personal, non-commercial use.</p><h3>User Accounts</h3><p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>',
            ],
            [
                'slug' => 'shipping-policy',
                'title' => 'Shipping Policy',
                'subtitle' => 'Information regarding product links, partner shipping, and delivery.',
                'content' => '<p>Anita\'s List curates recommendations and links to trusted retailer partners (such as Amazon, John Lewis, etc.). Shipping terms, delivery times, and fulfillment fees are governed by the respective retailer from which the item is purchased.</p>',
            ],
            [
                'slug' => 'refund-policy',
                'title' => 'Refund Policy',
                'subtitle' => 'Guidelines for returns, exchanges, and refund handling.',
                'content' => '<p>Because purchases made through Anita\'s List links are completed directly on external retailer websites, all returns, exchanges, and refunds must be processed through the retailer where the item was bought in accordance with their return policy.</p>',
            ],
            [
                'slug' => 'cookie-declaration',
                'title' => 'Cookie Declaration',
                'subtitle' => 'How we use cookies to personalize your experience.',
                'content' => '<p>This website uses cookies to personalize content, enable core registry functionality, analyze website traffic, and improve user navigation.</p><h3>Necessary Cookies</h3><p>Necessary cookies enable basic functions like page navigation and access to secure areas of the website (such as your Hub).</p>',
            ],
            [
                'slug' => 'contact',
                'title' => 'Contact Us',
                'subtitle' => "Have a question? We'd love to hear from you. Fill out the form below or reach out to us directly.",
                'content' => '',
            ],
        ];

        foreach ($initialPages as $pageData) {
            $page = \App\Models\Page::where('slug', $pageData['slug'])->first();
            if (!$page) {
                \App\Models\Page::create($pageData);
            } elseif (empty($page->content) || empty($page->subtitle)) {
                $page->update([
                    'title' => $pageData['title'],
                    'subtitle' => $pageData['subtitle'],
                    'content' => $pageData['content'],
                ]);
            }
        }
    }

    if (\Illuminate\Support\Facades\Schema::hasTable('pages') && !\Illuminate\Support\Facades\Schema::hasColumn('pages', 'side_image')) {
        \Illuminate\Support\Facades\Schema::table('pages', function ($table) {
            $table->string('side_image')->nullable();
        });
    }

    if (!\Illuminate\Support\Facades\Schema::hasColumn('home_page_settings', 'how_it_works_title')) {
        \Illuminate\Support\Facades\Schema::table('home_page_settings', function ($table) {
            $table->string('how_it_works_title')->nullable();
            $table->string('how_it_works_subtitle')->nullable();
            $table->string('step1_title')->nullable();
            $table->text('step1_description')->nullable();
            $table->string('step2_title')->nullable();
            $table->text('step2_description')->nullable();
            $table->string('step3_title')->nullable();
            $table->text('step3_description')->nullable();
            $table->string('brand_partners_title')->nullable();
        });
    }

    $settings = \App\Models\HomePageSetting::latest('updated_at')->first() ?? \App\Models\HomePageSetting::create(
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
            'how_it_works_title' => 'How it works: A clear, expert-led approach to baby shopping',
            'how_it_works_subtitle' => 'HOW IT WORKS',
            'step1_title' => 'Discover recommendations',
            'step1_description' => 'Explore unbiased, expert-tested baby gear shortlisted by maternity nurse Anita.',
            'step2_title' => 'Curate your list',
            'step2_description' => 'Add your favorite essentials to custom baby lists or registries with ease.',
            'step3_title' => 'Share & manage',
            'step3_description' => 'Share your registry link with loved ones and track purchased items in real-time.',
            'expert_advice_title' => 'Personalised advice based on years of experience',
            'expert_advice_description' => "Anita's list was created to strip away the noise and bring clarity to baby shopping.",
            'brand_partners_title' => 'Trusted by leading baby brands worldwide',
        ]
    );
    return response()->json($settings);
});

// Public Site Settings Route (Header & Footer CMS)
Route::get('/site-settings', function () {
    if (!\Illuminate\Support\Facades\Schema::hasTable('site_settings')) {
        \Illuminate\Support\Facades\Schema::create('site_settings', function ($table) {
            $table->id();
            $table->string('site_name')->default("anita's list");
            $table->string('header_logo')->nullable();
            $table->json('header_links')->nullable();
            $table->string('header_cta_label')->default('Create account');
            $table->string('header_cta_href')->default('/signup');
            $table->string('footer_logo_symbol')->nullable()->default('a');
            $table->string('footer_logo_image')->nullable();
            $table->string('footer_newsletter_title')->default('BE IN THE KNOW');
            $table->text('footer_newsletter_subtitle')->default('Be the first to know about new collections, news and exclusive offers');
            $table->json('footer_brand_links')->nullable();
            $table->json('footer_help_links')->nullable();
            $table->text('footer_copyright')->nullable();
            $table->timestamps();
        });
    }

    $siteSettings = \App\Models\SiteSetting::latest('updated_at')->first() ?? \App\Models\SiteSetting::create(
        [
            'site_name' => "anita's list",
            'header_cta_label' => 'Create account',
            'header_cta_href' => '/signup',
            'header_links' => [
                ['label' => 'Products', 'href' => '/products'],
                ['label' => 'Expert advice', 'href' => '/expert-advice'],
                ['label' => 'About', 'href' => '/about'],
                ['label' => 'Contact', 'href' => '/contact'],
            ],
            'footer_logo_symbol' => 'a',
            'footer_newsletter_title' => 'BE IN THE KNOW',
            'footer_newsletter_subtitle' => 'Be the first to know about new collections, news and exclusive offers',
            'footer_brand_links' => [
                ['label' => 'Who we are', 'href' => '/about'],
                ['label' => "Anita's List podcast", 'href' => '/podcast'],
                ['label' => 'Private consultations', 'href' => '/expert-advice/consultation'],
                ['label' => 'FAQs', 'href' => '/faq'],
                ['label' => 'Work with us', 'href' => '/work-with-us'],
            ],
            'footer_help_links' => [
                ['label' => 'Shipping policy', 'href' => '/shipping-policy'],
                ['label' => 'Refund policy', 'href' => '/refund-policy'],
                ['label' => 'Terms of service', 'href' => '/terms-of-service'],
                ['label' => 'Privacy policy', 'href' => '/privacy-policy'],
                ['label' => 'Cookie declaration', 'href' => '/cookie-declaration'],
            ],
            'footer_copyright' => 'By clicking the submit button, I declare that I have read the terms of service and accept the Privacy Policy.',
        ]
    );

    return response()->json($siteSettings);
});

// Public Pages Routes
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Public Shared Registry Route
Route::get('/registries/shared/{token}', [UserListController::class, 'showShared']);
Route::put('/registries/shared/{token}/items/{item}', [UserListController::class, 'updateSharedItemStatus']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/profile', [AuthController::class, 'updateProfile']);

    // Hub / Lists & Registries
    Route::apiResource('lists', UserListController::class);
    Route::post('/lists/{list}/convert', [UserListController::class, 'convertToRegistry']);
    
    // Items within a list/registry
    Route::get('/lists/{list}/items', [UserListItemController::class, 'index']);
    Route::post('/lists/{list}/items', [UserListItemController::class, 'store']);
    Route::put('/lists/{list}/items/{item}', [UserListItemController::class, 'update']);
    Route::delete('/lists/{list}/items/{item}', [UserListItemController::class, 'destroy']);

    // Hub / Key Dates
    Route::apiResource('dates', KeyDateController::class);

    // Hub / Notes
    Route::apiResource('notes', NoteController::class);
});
