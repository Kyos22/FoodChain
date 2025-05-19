<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $timestamps = false;

    protected $table = 'category';
    protected $fillable = [
        'id', 'nameCategory'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'idCategory');
    }
}
