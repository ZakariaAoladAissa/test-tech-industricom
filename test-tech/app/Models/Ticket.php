<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Ticket extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'title',
        'description',
        'speciality',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
