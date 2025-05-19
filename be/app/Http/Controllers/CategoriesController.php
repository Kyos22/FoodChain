<?php

namespace App\Http\Controllers;

use App\Http\Services\CategoryService;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoriesController extends Controller
{
    protected $categoryService;
    public function __construct(CategoryService $_categoryService)
    {
        $this->categoryService = $_categoryService;
    }
    
    public function GetCategories()
    {
        try {
            $categories = $this->categoryService->getAllCategories();
            if ($categories->isEmpty()) {
                return response()->json(['message' => 'No categories found','data' => ''], 404);
            }
            
            return response()->json(['data' => $categories, 'message' => 'Categories retrieved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function AddCategory(Request $request)
    {
        
        try {

            $validatedData = $request->validate([
                'nameCategory' => 'required|string|max:255',
            ]);
            $category = $this->categoryService->addCategory($validatedData);
            if (!$category) {
                return response()->json(['message' => 'Failed to add category'], 401);
            }
            return response()->json(['data' => $category, 'message' => 'Category added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
