<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelper;
use App\Http\Services\UnitService;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    protected $unitService;
    public function __construct(UnitService $_unitService)
    {
        $this->unitService = $_unitService;
    }   
    public function GetUnits()
    {
        try {
            $units = $this->unitService->getAllUnits();
            if ($units->isEmpty()) {
                return ResponseHelper::error('No units found', 404);
            }
            
            return ResponseHelper::success($units, 'Units retrieved successfully',200);
        } catch (\Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }
    public function AddUnit(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nameUnit' => 'required|string|max:255',
            ]);
            $unit = $this->unitService->addUnit($validatedData);
            if (!$unit) {
                return ResponseHelper::error('Failed to add unit', 500);
            }
            return ResponseHelper::success($unit, 'Unit added successfully', 201);
        } catch (\Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }
}
