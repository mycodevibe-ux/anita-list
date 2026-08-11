<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Schema;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Header & Footer Settings';
    protected static ?int $navigationSort = 2;

    public static function canCreate(): bool
    {
        return SiteSetting::count() === 0;
    }

    public static function form(Form $form): Form
    {
        self::ensureTableExists();

        return $form
            ->schema([
                Forms\Components\Tabs::make('Site Settings')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Header Settings')
                            ->icon('heroicon-o-bars-3')
                            ->schema([
                                Forms\Components\Section::make('Branding & Logo')
                                    ->schema([
                                        Forms\Components\TextInput::make('site_name')
                                            ->label('Site Brand Name')
                                            ->default("anita's list")
                                            ->required(),
                                        Forms\Components\FileUpload::make('header_logo')
                                            ->label('Header Logo Image')
                                            ->image()
                                            ->directory('site'),
                                    ]),
                                Forms\Components\Section::make('Navigation Menu Links')
                                    ->schema([
                                        Forms\Components\Repeater::make('header_links')
                                            ->label('Header Menu Links')
                                            ->schema([
                                                Forms\Components\TextInput::make('label')->required()->placeholder('e.g. Products'),
                                                Forms\Components\TextInput::make('href')->required()->placeholder('e.g. /products'),
                                            ])
                                            ->columns(2)
                                            ->default([
                                                ['label' => 'Products', 'href' => '/products'],
                                                ['label' => 'Expert advice', 'href' => '/expert-advice'],
                                                ['label' => 'About', 'href' => '/about'],
                                                ['label' => 'Contact', 'href' => '/contact'],
                                            ]),
                                    ]),
                                Forms\Components\Section::make('CTA Button')
                                    ->schema([
                                        Forms\Components\TextInput::make('header_cta_label')
                                            ->label('CTA Button Label')
                                            ->default('Create account'),
                                        Forms\Components\TextInput::make('header_cta_href')
                                            ->label('CTA Button Link')
                                            ->default('/signup'),
                                    ])
                                    ->columns(2),
                            ]),

                        Forms\Components\Tabs\Tab::make('Footer Settings')
                            ->icon('heroicon-o-rectangle-group')
                            ->schema([
                                Forms\Components\Section::make('Footer Branding')
                                    ->schema([
                                        Forms\Components\TextInput::make('footer_logo_symbol')
                                            ->label('Footer Logo Symbol / Initial')
                                            ->nullable()
                                            ->default('a'),
                                        Forms\Components\FileUpload::make('footer_logo_image')
                                            ->label('Footer Custom Logo Image (Optional)')
                                            ->image()
                                            ->directory('site'),
                                    ])
                                    ->columns(2),
                                Forms\Components\Section::make('Newsletter Section')
                                    ->schema([
                                        Forms\Components\TextInput::make('footer_newsletter_title')
                                            ->label('Newsletter Title')
                                            ->default('BE IN THE KNOW'),
                                        Forms\Components\Textarea::make('footer_newsletter_subtitle')
                                            ->label('Newsletter Subtitle')
                                            ->rows(2)
                                            ->default('Be the first to know about new collections, news and exclusive offers'),
                                    ]),
                                Forms\Components\Section::make('Footer Links Columns')
                                    ->schema([
                                        Forms\Components\Repeater::make('footer_brand_links')
                                            ->label('Column 1: Our Brand Links')
                                            ->schema([
                                                Forms\Components\TextInput::make('label')->required(),
                                                Forms\Components\TextInput::make('href')->required(),
                                            ])
                                            ->columns(2)
                                            ->default([
                                                ['label' => 'Who we are', 'href' => '/about'],
                                                ['label' => "Anita's List podcast", 'href' => '/podcast'],
                                                ['label' => 'Private consultations', 'href' => '/expert-advice/consultation'],
                                                ['label' => 'FAQs', 'href' => '/faq'],
                                                ['label' => 'Work with us', 'href' => '/work-with-us'],
                                            ]),
                                        Forms\Components\Repeater::make('footer_help_links')
                                            ->label('Column 2: Help & Policies Links')
                                            ->schema([
                                                Forms\Components\TextInput::make('label')->required(),
                                                Forms\Components\TextInput::make('href')->required(),
                                            ])
                                            ->columns(2)
                                            ->default([
                                                ['label' => 'Shipping policy', 'href' => '/shipping-policy'],
                                                ['label' => 'Refund policy', 'href' => '/refund-policy'],
                                                ['label' => 'Terms of service', 'href' => '/terms-of-service'],
                                                ['label' => 'Privacy policy', 'href' => '/privacy-policy'],
                                                ['label' => 'Cookie declaration', 'href' => '/cookie-declaration'],
                                            ]),
                                    ]),
                                Forms\Components\Section::make('Disclaimer / Copyright Text')
                                    ->schema([
                                        Forms\Components\Textarea::make('footer_copyright')
                                            ->label('Footer Disclaimer Text')
                                            ->rows(2)
                                            ->default('By clicking the submit button, I declare that I have read the terms of service and accept the Privacy Policy.'),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Auth Pages Settings')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Forms\Components\Section::make('Login Page Configuration')
                                    ->description('Customize content and media for the Sign In page.')
                                    ->schema([
                                        Forms\Components\FileUpload::make('login_image')
                                            ->label('Login Page Side Image')
                                            ->image()
                                            ->directory('auth'),
                                        Forms\Components\TextInput::make('login_badge')
                                            ->label('Top Badge Text')
                                            ->default("WELCOME BACK TO ANITA'S LIST"),
                                        Forms\Components\Textarea::make('login_title')
                                            ->label('Main Heading Title')
                                            ->rows(2)
                                            ->default("Sign in to access your curated lists & recommendations."),
                                        Forms\Components\TextInput::make('login_button_text')
                                            ->label('Submit Button Label')
                                            ->default("Sign in"),
                                    ])
                                    ->columns(2),
                                Forms\Components\Section::make('Signup Page Configuration')
                                    ->description('Customize content and media for the Sign Up page.')
                                    ->schema([
                                        Forms\Components\FileUpload::make('signup_image')
                                            ->label('Signup Page Side Image')
                                            ->image()
                                            ->directory('auth'),
                                        Forms\Components\TextInput::make('signup_badge')
                                            ->label('Top Badge Text')
                                            ->default("JOIN ANITA'S LIST"),
                                        Forms\Components\Textarea::make('signup_title')
                                            ->label('Main Heading Title')
                                            ->rows(2)
                                            ->default("Create an account to build your baby registry & get expert recommendations."),
                                        Forms\Components\TextInput::make('signup_button_text')
                                            ->label('Submit Button Label')
                                            ->default("Create account"),
                                    ])
                                    ->columns(2),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        self::ensureTableExists();

        return $table
            ->columns([
                Tables\Columns\TextColumn::make('site_name')
                    ->label('Brand Name'),
                Tables\Columns\TextColumn::make('footer_logo_symbol')
                    ->label('Footer Symbol'),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        self::ensureTableExists();

        return [
            'index' => Pages\ListSiteSettings::route('/'),
            'create' => Pages\CreateSiteSetting::route('/create'),
            'edit' => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }

    private static function ensureTableExists(): void
    {
        if (!Schema::hasTable('site_settings')) {
            Schema::create('site_settings', function ($table) {
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
                $table->string('login_image')->nullable();
                $table->string('signup_image')->nullable();
                $table->string('login_badge')->nullable();
                $table->text('login_title')->nullable();
                $table->string('login_button_text')->nullable();
                $table->string('signup_badge')->nullable();
                $table->text('signup_title')->nullable();
                $table->string('signup_button_text')->nullable();
                $table->timestamps();
            });

            SiteSetting::firstOrCreate(
                ['id' => 1],
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
                    'login_badge' => "WELCOME BACK TO ANITA'S LIST",
                    'login_title' => "Sign in to access your curated lists & recommendations.",
                    'login_button_text' => "Sign in",
                    'signup_badge' => "JOIN ANITA'S LIST",
                    'signup_title' => "Create an account to build your baby registry & get expert recommendations.",
                    'signup_button_text' => "Create account",
                ]
            );
        }

        if (Schema::hasTable('site_settings')) {
            $newColumns = [
                'login_image' => 'string',
                'signup_image' => 'string',
                'login_badge' => 'string',
                'login_title' => 'text',
                'login_button_text' => 'string',
                'signup_badge' => 'string',
                'signup_title' => 'text',
                'signup_button_text' => 'string',
            ];

            foreach ($newColumns as $col => $type) {
                if (!Schema::hasColumn('site_settings', $col)) {
                    Schema::table('site_settings', function ($table) use ($col, $type) {
                        if ($type === 'text') {
                            $table->text($col)->nullable();
                        } else {
                            $table->string($col)->nullable();
                        }
                    });
                }
            }
        }
    }
}
