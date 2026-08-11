<?php

namespace App\Filament\Resources\SiteSettingResource\Pages;

use App\Filament\Resources\SiteSettingResource;
use App\Models\SiteSetting;
use Filament\Resources\Pages\ListRecords;

class ListSiteSettings extends ListRecords
{
    protected static string $resource = SiteSettingResource::class;

    public function mount(): void
    {
        parent::mount();

        $record = SiteSetting::first();
        if ($record) {
            $this->redirect(SiteSettingResource::getUrl('edit', ['record' => $record->id]));
        }
    }
}
