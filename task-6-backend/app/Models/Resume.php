<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;

    protected $table = 'resumes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'status',
        'profession',
        'city',
        'photo_path',
        'full_name',
        'phone',
        'email',
        'birthdate',
        'salary',
        'skills',
        'work_schedule',
        'about',
    ];

    protected $casts = [
        'skills' => 'array'
    ];

    // relationship
    public function education() {
        return $this->hasMany(Education::class, 'resume_id');
    }
}
