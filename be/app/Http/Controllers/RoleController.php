<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function addRole(Request $request){
        try{
            $validated = $request -> validate([
                'nameRole' => 'required|max:255',
            ]);

            $existingRole = Role::where('nameRole', $validated['nameRole']) -> first();
            if ($existingRole){
                return response()->json([
                    'message' => 'role is already exist',
                    'data' => $existingRole,
                ],200);
            }

            $role = Role::create([
                'nameRole' => $validated['nameRole']
            ]);
            return response()->json([
                'message' => 'success',
                'data' => $role,
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'error' => $e -> getMessage()
            ]);
        }
    }
    public function GetRoleByUserId($id){
        try{
            $role = Role::findOrFail($id);
            if($role){
                return response()->json([
                    'message' => 'get succes',
                    'data'    => $role->nameRole,
                ]);
            }
        }catch(\Exception $e){
            return response()->json([
                'error' => "internal server",
                'messageError' => $e -> getMessage()
            ]);
        }
    }
    public function GetAllRoles(){
        try{
            $allRole = Role::all();
            return response()->json([
                'message' => 'get all role success',
                'data'    => $allRole
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'internal server',
                'message' => $e -> getMessage(),
            ],500);
        }
    }
}
