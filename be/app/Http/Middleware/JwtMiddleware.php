<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   
      public function handle($request, Closure $next){
    $token = $request->bearerToken();
    //  $token = JWTAuth::getToken();
     if (!$token) { // Đọc token từ cookie
        return response()->json(['message' => 'Token not provided'], 401);
    }

    try {
        
        $user = JWTAuth::setToken($token)->authenticate();
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
        return response()->json(['message' => 'Token expired'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json(['message' => 'Token invalid'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json(['message' => 'Token absent'], 401);
    }

    $request->merge(['user' => $user]);

    return $next($request);
}
}
