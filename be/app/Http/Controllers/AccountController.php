<?php

namespace App\Http\Controllers;

use App\Http\Services\AccountService;
use App\Models\Accounts;
use App\Models\Role;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Expr\FuncCall;
use PhpParser\Node\Stmt\TryCatch;

class AccountController extends Controller
{
    protected $accountService;
    public function __construct(AccountService $account_Service)
    {
        $this->accountService = $account_Service;
    }
    //  cdcs
    public function getAccount(){
        try{
            $accounts=Accounts::all();
            // $accounts = DB::table('accounts') -> get();
            return response()->json([
                'data' => $accounts,
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }
    public function updateAccount(Request $request, $id){
        try{
            $validated = $request->validate([
                'fullName' => 'required|string|max:255',
                'email'    => 'required|string|max:255',
                'idRole'   => 'numeric',
            ]);
            $role = Role::find($validated['idRole']);
            $nameRole = $role -> nameRole;

            $account = Accounts::findOrFail($id);
            $account -> update([
                'fullName' => $validated['fullName'],
                'email'    => $validated['email'],
                'idRole'   => $validated['idRole'],
                'nameRole' => $nameRole,
            ]);
            return response()->json([
                'message' => 'Username updated successfully',
                'data' => $account,
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function DeleteAccount($id){
        try{
            $account = Accounts::findOrFail($id);
            $account -> delete();
            return response()->json([
                'message' => 'account deleted successFully',
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'error'   => 'internal server error',
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function Register(Request $request){
        try{
            $validated = $request->validate([
                'fullName' => 'required|string|max:255',
                'password' => 'required|string|max:255',
                'idRole'   => 'required|numeric',
                'email'    => 'required|email|unique:accounts,email|max:255',
            ],[
                'email.unique' => 'email existed'
            ]);
            $passwordBcrypt = Hash::make($request->password);
            // Log::info('idrole:',['idrole' => $validated['idRole']]);

            $role = Role::find($validated['idRole']);
            // Log::info('Account found:', ['account' => $request]);
            $nameRole = $role -> nameRole;

            // Log::info('nanerole:',['name role' => $nameRole]);


            if(!$role){
                return response()->json([
                    'message' => 'role not found'
                ]);
            }
            $account        = Accounts::create([
                'fullName'   => $validated['fullName'],
                'password'   => $passwordBcrypt,
                'idRole'     => $validated['idRole'],
                'nameRole'   => $nameRole,
                'email'      => $validated['email'],
                'idEmployee' => 0,
                'status'     => 1,
            ]);
            $account->idEmployee = $account->id + 80000;
            $account -> save();
            return response()->json([
                'message' => 'success',
                'data'    => $account,
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e ->getMessage(),
            ]);
        }
    }

    // public function Login(Request $request){
    //     try{
           
    //         $validated = $request->validate([
    //             'idEmployee' => 'required|numeric',
    //             'password' => 'required|string|max:255',
    //         ]);
    //         $accountFind = $this->accountService::findAccountByIdEmployee($validated['idEmployee']);
    //         // $username = Accounts::where('username', )
    //         // dd($accountFind); 
    //         if(!$accountFind){
    //             return response()->json([
    //                 'message' => 'invalid idEmployee or password'
    //             ],404);
    //         }
    //         if(Hash::check($validated['password'], $accountFind->password)){
    //             return response()->json([
    //                 'message' => 'login successful',
    //                 'data'    => $accountFind,
    //             ],200);
    //         }
    //     }catch(\Exception $e){
    //         return response()->json([
    //             'message' => 'internal server',
    //             'error'   => $e ->getMessage()
    //         ]);
    //     }
    // }
    public function FindByFullName($searchName){
        try{
            $account = Accounts::where('fullName','like', '%'.$searchName.'%')->get();
            return response()->json([
                'message' => 'success get',
                'data'    => $account
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'internal server',
                'data'    => $e -> getMessage()
            ],200);
        }
    }
    public function FindByUserName($inputIdEmployee){
        try{
            $accounts = Accounts::where('idEmployee','like','%'.$inputIdEmployee.'%')->get();
            return response()->json([
                'message' => 'get success',
                'data'    => $accounts
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e -> getMessage() 
            ]);
        }
    }
    public function FindByRole($id){
        try{
            $account = Accounts::where('idRole',$id)->get();
            if ($account){
                return response()->json([
                    'message' => 'success',
                    'data'    => $account
                ]);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => 'failed',
                'data'    => $e->getMessage()
            ]);
        }
    }
    public function UpdateStatusAccount(Request $request,$idAccount){
        try{
            $account = Accounts::findOrFail($idAccount);
            if ($account){
                $account -> update([
                    'status' => $request->status
                ]);
                return response()->json([
                    'message' => 'success',
                    'data'    => $account
                ],200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => 'failed',
                'data'    => $e -> getMessage()
            ],500);
        }
    }
    public function GetAccountById($id){
        try{
            if(!$id){
                return response()->json([
                    'message' => 'id not found'
                ]);
            }
            $account = Accounts::where('id',$id)->first();
            if(!$account){
                return response()->json([
                    'message' => 'account not found'
                ]);
            }
            return response()->json([
                'message' => 'success',
                'data'    => $account
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'failed',
                'data'    => $e -> getMessage()
            ],500);
        }
    }
    
    
}
