<?php

use App\Http\Middleware\JwtMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Providers\LaravelServiceProvider;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
   ->withMiddleware(function (Middleware $middleware) {
    // dd('Middleware:', $middleware);
        $middleware->alias([
            // dd('Middleware:', $middleware),
            'jwt.auth' => JwtMiddleware::class,
        ]);
        
    })
    ->withProviders([
        LaravelServiceProvider::class,
    ])
    ->withBindings([
    \Illuminate\Contracts\Auth\Authenticatable::class => \App\Models\Accounts::class,
])

    ->withExceptions(function (Exceptions $exceptions) {
        // $exceptions->render(function (AuthenticationException $e, Request $request) {
        //     if ($request->is('auth/*')) {
        //         return response()->json([
        //             'message' => $e->getMessage(),
        //         ], 401);
        //     }
            
        // });
    })->create();