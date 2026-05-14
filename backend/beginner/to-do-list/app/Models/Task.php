<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
    ];

    public function index() {
        $tasks = Task::orderBy('created_at','desc')->get();
        return $tasks;
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
