<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;
    
    protected $table = 'education';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'level',
        'institution',
        'faculty',
        'specialization',
        'end_year',
        'resume_id',
    ];
}
