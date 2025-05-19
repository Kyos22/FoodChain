<?php

namespace App\Http\Controllers;

use App\Http\Services\AccountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $accountService;
    public function __construct(AccountService $account_Service)
    {
        $this->accountService = $account_Service;
    }

    public function Login(Request $request){
        try{
            $credentials = $request->only('idEmployee', 'password');
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'invalid idEmployee or password'
                ], 401);
            }
            $cookie = cookie(
                'token',     // name
                $token,      // value
                60,          // minutes
                "/",         // path
                "localhost", // domain
                false,       // Secure = false vì đang dùng http
                false,       // HttpOnly = false để JS đọc được nếu muốn
                false,
                'Lax'        // hoặc 'None' nếu cần cross-site
            );

            $validated = $request->validate([
                'idEmployee' => 'required|numeric',
                'password' => 'required|string|max:255',
            ]);
            $accountFind = $this->accountService::findAccountByIdEmployee($validated['idEmployee']);
            // $username = Accounts::where('username', )
            // dd($accountFind); 
            if(!$accountFind){
                return response()->json([
                    'message' => 'invalid idEmployee or password'
                ],404);
            }
            
                return response()->json([
                    'message'    => 'login successful',
                    'data'       => $accountFind,
                    'token'      => $token,
                    
                    'expires_in' => JWTAuth::factory()->getTTL() * 60,

                ],200)->withCookie($cookie);
            
           

        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e ->getMessage()
            ]);
        }
    }

    public function Logout(Request $request){
        try{
            $cookie = Cookie::forget('token');
            return response()->json([
                'message' => 'logout successful'
            ])->withCookie($cookie);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e ->getMessage()
            ]);
        }
    }
    public function RefreshToken(Request $request){
        try{
            $token = JWTAuth::parseToken()->refresh();
            $cookie = cookie(
                'token',     // name
                $token,      // value
                60,          // minutes
                "/",         // path
                "localhost", // domain
                false,       // Secure = false vì đang dùng http
                false,       // HttpOnly = false để JS đọc được nếu muốn
                false,
                'Lax'        // hoặc 'None' nếu cần cross-site
            );
            return response()->json([
                'message' => 'refresh token successful',
                'token'   => $token,
            ])->withCookie($cookie);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e ->getMessage()
            ]);
        }
    }
    public function me(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();
                // dd(Auth::user()); // hoặc return request()->get('user');

            // return response()->json([
            //     'message' => 'get user successful',
            //     'data'    => $user,
            // ]);
            return response()->json(Auth::user());
        }catch(\Exception $e){
            return response()->json([
                'message' => 'internal server',
                'error'   => $e ->getMessage()
            ]);
        }
    }
}
