<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Schema;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Content Pages';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        self::ensureTableExists();

        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Page Information')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Page Title')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                        $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null
                                    ),
                                Forms\Components\TextInput::make('slug')
                                    ->label('URL Slug')
                                    ->required()
                                    ->unique(Page::class, 'slug', ignoreRecord: true)
                                    ->helperText('URL path, e.g. about, faq, expert-advice, terms-of-service'),
                                Forms\Components\TextInput::make('subtitle')
                                    ->label('Subtitle / Header Tagline')
                                    ->maxLength(255),
                                Forms\Components\RichEditor::make('content')
                                    ->label('Page Content')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status & Media')
                            ->schema([
                                Forms\Components\Toggle::make('is_published')
                                    ->label('Published')
                                    ->default(true),
                                Forms\Components\FileUpload::make('banner_image')
                                    ->label('Main Banner / Hero Image')
                                    ->image()
                                    ->directory('pages'),
                                Forms\Components\FileUpload::make('side_image')
                                    ->label('Side / Story Image')
                                    ->image()
                                    ->directory('pages'),
                            ]),

                        Forms\Components\Section::make('SEO Settings')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title')
                                    ->label('Meta Title')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('meta_description')
                                    ->label('Meta Description')
                                    ->rows(3),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        self::ensureTableExists();

        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->badge()
                    ->color('gray'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Status')
                    ->boolean(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published Status'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        self::ensureTableExists();

        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }

    private static function ensureTableExists(): void
    {
        if (!Schema::hasTable('pages')) {
            Schema::create('pages', function ($table) {
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

            $initialPages = [
                [
                    'slug' => 'about',
                    'title' => 'Who We Are',
                    'subtitle' => 'Expert guidance for your parenting journey.',
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
                $page = Page::where('slug', $pageData['slug'])->first();
                if (!$page) {
                    Page::create($pageData);
                } elseif (empty($page->content) || empty($page->subtitle)) {
                    $page->update([
                        'title' => $pageData['title'],
                        'subtitle' => $pageData['subtitle'],
                        'content' => $pageData['content'],
                    ]);
                }
            }
        }

        if (Schema::hasTable('pages') && !Schema::hasColumn('pages', 'side_image')) {
            Schema::table('pages', function ($table) {
                $table->string('side_image')->nullable();
            });
        }
    }
}
