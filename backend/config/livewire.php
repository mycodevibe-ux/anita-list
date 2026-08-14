<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Temporary File Uploads
    |--------------------------------------------------------------------------
    |
    | Livewire handles file uploads by storing them in a temporary directory
    | before they are validated and saved permanently.
    |
    */

    'temporary_file_upload' => [
        'disk' => 'public',
        'rules' => ['file', 'max:51200'], // 50MB max upload size
        'directory' => 'livewire-tmp',
        'middleware' => null,
        'preview_mimes' => [
            'png', 'gif', 'bmp', 'svg', 'wav', 'mp4', 'mov', 'avi', 'wmv', 'mp3', 'm4a', 'jpg', 'jpeg', 'mpga', 'webp',
        ],
        'max_upload_time' => 10,
    ],

];
