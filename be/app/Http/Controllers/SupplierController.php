<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelper;
use App\Http\Services\SupplierService;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    protected $supplierService;

    public function __construct()
    {
        $this->supplierService = new SupplierService();
    }

    public function GetSuppliers()
    {
        try {
            $suppliers = $this->supplierService->GetAllSuppliers();
            if ($suppliers->isEmpty()) {
                return ResponseHelper::errorWithData('No suppliers found', 404);
            }
            return response()->json(['data' => $suppliers, 'message' => 'Suppliers retrieved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function AddSupplier(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nameSupplier' => 'required|string|max:255',
                'address'      => 'required|string|max:255',
                'phone'        => 'required|numeric',
                'email'        => 'required|string|max:255',
                'contactName'  => 'required|string|max:255',
            ]);
            $supplier = $this->supplierService->AddSupplier($validatedData);
            if (!$supplier) {
                return response()->json(['message' => 'Failed to add supplier'], 401);
            }
            return response()->json(['data' => $supplier, 'message' => 'Supplier added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
