<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    public $timestamps = false;

    protected $table = 'unit';
    protected $fillable = [
        'id', 'nameUnit'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'idUnit');
    }
}
