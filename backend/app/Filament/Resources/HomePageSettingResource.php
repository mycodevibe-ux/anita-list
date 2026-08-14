<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HomePageSettingResource\Pages;
use App\Models\HomePageSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HomePageSettingResource extends Resource
{
    protected static ?string $model = HomePageSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Homepage Settings';
    protected static ?int $navigationSort = 1;

    public static function canCreate(): bool
    {
        return HomePageSetting::count() === 0;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Homepage Content')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Hero Slider Section')
                            ->icon('heroicon-o-presentation-chart-bar')
                            ->schema([
                                Forms\Components\Repeater::make('hero_slides')
                                    ->label('Hero Banner Slides')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')
                                            ->label('Slide Title (Use *text* for italics)')
                                            ->required()
                                            ->placeholder('e.g. Helping you choose the right baby essentials...'),
                                        Forms\Components\TextInput::make('subtitle')
                                            ->label('Slide Subtitle')
                                            ->placeholder('e.g. Discover baby essentials, seek advice...'),
                                        Forms\Components\FileUpload::make('image')
                                            ->label('Upload Background Image')
                                            ->image()
                                            ->disk('public')
                                            ->maxSize(10240)
                                            ->visibility('public')
                                            ->deletable()
                                            ->directory('homepage'),
                                        Forms\Components\TextInput::make('image_url')
                                            ->label('Or Image URL / Path (Optional)')
                                            ->placeholder('e.g. /images/banner1.jpg or https://...'),
                                    ])
                                    ->collapsible()
                                    ->defaultItems(1)
                                    ->addActionLabel('+ Add Slide')
                            ]),

                        Forms\Components\Tabs\Tab::make('How It Works Section')
                            ->icon('heroicon-o-light-bulb')
                            ->schema([
                                Forms\Components\TextInput::make('how_it_works_title')
                                    ->label('Section Title')
                                    ->placeholder("How it works: A clear, expert-led approach to baby shopping")
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('how_it_works_subtitle')
                                    ->label('Section Subtitle')
                                    ->placeholder("HOW IT WORKS")
                                    ->maxLength(255),
                                
                                Forms\Components\Grid::make(3)
                                    ->schema([
                                        Forms\Components\Section::make('Step 1')
                                            ->schema([
                                                Forms\Components\TextInput::make('step1_title')
                                                    ->label('Step 1 Title')
                                                    ->placeholder("Discover recommendations"),
                                                Forms\Components\Textarea::make('step1_description')
                                                    ->label('Step 1 Description')
                                                    ->rows(3),
                                            ]),
                                        Forms\Components\Section::make('Step 2')
                                            ->schema([
                                                Forms\Components\TextInput::make('step2_title')
                                                    ->label('Step 2 Title')
                                                    ->placeholder("Curate your list"),
                                                Forms\Components\Textarea::make('step2_description')
                                                    ->label('Step 2 Description')
                                                    ->rows(3),
                                            ]),
                                        Forms\Components\Section::make('Step 3')
                                            ->schema([
                                                Forms\Components\TextInput::make('step3_title')
                                                    ->label('Step 3 Title')
                                                    ->placeholder("Share & manage"),
                                                Forms\Components\Textarea::make('step3_description')
                                                    ->label('Step 3 Description')
                                                    ->rows(3),
                                            ]),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Expert Advice Section')
                            ->icon('heroicon-o-academic-cap')
                            ->schema([
                                Forms\Components\TextInput::make('expert_advice_title')
                                    ->label('Advice Block Title')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('expert_advice_description')
                                    ->label('Advice Description')
                                    ->required()
                                    ->rows(4),
                                Forms\Components\FileUpload::make('expert_advice_image')
                                    ->label('Side Image')
                                    ->image()
                                    ->disk('public')
                                    ->maxSize(10240)
                                    ->visibility('public')
                                    ->deletable()
                                    ->directory('homepage'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Brand Partners Section')
                            ->icon('heroicon-o-building-storefront')
                            ->schema([
                                Forms\Components\TextInput::make('brand_partners_title')
                                    ->label('Section Title')
                                    ->placeholder("Trusted by leading baby brands worldwide")
                                    ->maxLength(255),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('hero_title')
                    ->label('Hero Title')
                    ->limit(40),
                Tables\Columns\TextColumn::make('how_it_works_title')
                    ->label('How It Works')
                    ->limit(40),
                Tables\Columns\TextColumn::make('expert_advice_title')
                    ->label('Expert Advice')
                    ->limit(40),
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
        return [
            'index' => Pages\ListHomePageSettings::route('/'),
            'create' => Pages\CreateHomePageSetting::route('/create'),
            'edit' => Pages\EditHomePageSetting::route('/{record}/edit'),
        ];
    }
}
