<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public $timestamps = false;

    protected $table = 'supplier';
    protected $fillable = [
        'id', 'nameSupplier', 'address', 'phone', 'email', 'contactName'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'idSupplier');
    }
}
