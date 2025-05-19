<?php

namespace App\Http\Services;

use App\Models\Accounts;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Unit;

class ProductService
{
    protected $model;
    protected $baseService;

    public function __construct()
    {
        $this->baseService = new BaseService(Product::class);
    }

    public function getAllProducts()
    {
        return $this->baseService->getAll();
    }

    public function addProduct($data, $request)
    {

        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        // $data['image'] = $imageName;
        
        $supplier = Supplier::find($data['idSupplier']);
        $category = Category::find($data['idCategory']);
        $unit     = Unit::find($data['idUnit']);
        if (!$unit && !$category && !$supplier) {
            return null;
        }
       
        $nameSupplier = $supplier->nameSupplier;
        $nameCategory = $category->nameCategory;
        $nameUnit     = $unit->nameUnit;

        $product = Product::create([
            'nameProduct'  => $data['nameProduct'],
            'price'        => $data['price'],
            'image'        => $imageName,
            'status'       => 1,
            'idSupplier'   => $data['idSupplier'],
            'idCategory'   => $data['idCategory'],
            'idUnit'       => $data['idUnit'],
            'description'  => $data['description'],
            'nameSupplier' => $nameSupplier,
            'nameCategory' => $nameCategory,
            'unit'         => $nameUnit,
        ]);
        return $product;
        
    }
}

?>