<?php

namespace App\Http\Services;

use App\Models\Unit;
use Faker\Provider\Base;
use Illuminate\Http\Request;

class UnitService 
{
    protected $model;
    protected $baseService;
    public function __construct()
    {
        $this->baseService = new BaseService(Unit::class);
    }
    
    public function getAllUnits(){
        return $this->baseService->getAll();
    }
    public function addUnit($request){
        return $this->baseService->create($request);
    }
}

?>
