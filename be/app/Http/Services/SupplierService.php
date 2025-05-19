<?php

namespace App\Http\Services;

use App\Models\Supplier;

class SupplierService
{
    protected $model;
    protected $baseService;

    public function __construct()
    {
        $this->baseService = new BaseService(Supplier::class);
    }

    public function GetAllSuppliers()
    {
        return $this->baseService->getAll();
    }

    public function AddSupplier($data)
    {
        return $this->baseService->create($data);
    }
}

?>