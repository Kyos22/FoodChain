<?php

namespace App\Http\Services;

use App\Models\Category;

class CategoryService 
{
    protected $model;
    protected $baseService;
    public function __construct()
    {
        $this->baseService = new BaseService(Category::class);
    }

    public function getAllCategories(){
        return $this->baseService->getAll();
    }
    public function addCategory($data){
        return $this->baseService->create($data);
    }
}


?>