<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps = true;

    protected $table = 'products';
    protected $fillable = [
        'id', 'nameProduct', 'price', 'unit', 'image', 'description', 'status', 'idCategory', 'nameCategory', 'idSupplier', 'nameSupplier','idUnit'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'idCategory');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'idSupplier');
    }
    public function unit()
    {
        return $this->belongsTo(Unit::class, 'idUnit');
    }

}
