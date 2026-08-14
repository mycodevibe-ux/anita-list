<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('min_price')
                    ->numeric()
                    ->default(null),
                Forms\Components\TextInput::make('max_price')
                    ->numeric()
                    ->default(null),
                Forms\Components\FileUpload::make('image_url')
                    ->image(),
                Forms\Components\Toggle::make('is_recommended')
                    ->required(),
                Forms\Components\Section::make('Buying Options (Retailers)')
                    ->schema([
                        Forms\Components\Repeater::make('buyingOptions')
                            ->relationship('buyingOptions')
                            ->schema([
                                Forms\Components\TextInput::make('retailer_name')->label('Retailer Name')->required(),
                                Forms\Components\TextInput::make('price')->label('Price (£)')->required(),
                                Forms\Components\TextInput::make('affiliate_link')->label('Buy Link / URL'),
                            ])
                            ->collapsible()
                            ->defaultItems(1),
                    ]),
                Forms\Components\Section::make('Product Specifics (Accordion)')
                    ->schema([
                        Forms\Components\Repeater::make('specs')
                            ->relationship('specs')
                            ->schema([
                                Forms\Components\TextInput::make('spec_name')->label('Specification Title (e.g. Dimensions & Weight)')->required(),
                                Forms\Components\Textarea::make('spec_value')->label('Specification Details')->required()->rows(3),
                            ])
                            ->collapsible()
                            ->defaultItems(1),
                    ]),
                Forms\Components\TextInput::make('category_id')
                    ->numeric()
                    ->default(null),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('min_price')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('max_price')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\ImageColumn::make('image_url'),
                Tables\Columns\IconColumn::make('is_recommended')
                    ->boolean(),
                Tables\Columns\TextColumn::make('category_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
