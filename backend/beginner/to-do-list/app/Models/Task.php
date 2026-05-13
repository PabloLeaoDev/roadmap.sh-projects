<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
    ];

    public function index() {
        $tasks = Task::orderBy('created_at','desc');
        return $tasks;
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
