<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelper;
use App\Http\Services\ProductService;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct()
    {
        $this->productService = new ProductService();
    }

    public function GetAll()
    {
        try{
        $products = $this->productService->getAllProducts();
        if(!$products){
            return ResponseHelper::errorWithData('No products found', 404);
        }
        return ResponseHelper::success($products, 'Products retrieved successfully',200);
        }catch (\Exception $e){
            return ResponseHelper::error($e->getMessage(), 500);
        }

    }

    public function Create()
    {
        try{
            $validatedData = request()->validate([
                'nameProduct' => 'required|string|max:255',
                'price'       => 'required|numeric',
                'idUnit'      => 'required|numeric',
                // 'image'       => 'required|image|mimes:jpeg,png,jpg|max:2048|dimensions:min_width=100,min_height=100',                
                'description' => 'required|string|max:255',
                'image'       => 'required',               
                'idCategory'  => 'required|numeric',
                'idSupplier'  => 'required|numeric',
                // 'status'      => 'required|boolean',
            ]);
            $product = $this->productService->addProduct($validatedData,request());
            if(!$product){
                return ResponseHelper::errorWithData('Failed to add product', 401);
            }
            return ResponseHelper::success($product, 'Product added successfully', 201);
        }catch (\Exception $e){
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }

    
}
