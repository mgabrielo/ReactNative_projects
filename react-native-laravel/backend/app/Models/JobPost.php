<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    use HasFactory;
    protected $table = 'jobposts';
    protected $fillable = [
        'title',
        'description',
        'salary',
        'company',
        'postedAt',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
