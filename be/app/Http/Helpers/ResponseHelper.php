<?php

namespace App\Http\Helpers;

class ResponseHelper{
    public static function success($data, $message = 'Success', $statusCode = 200){
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public static function error($message, $statusCode){
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }
    public static function errorWithData($message, $statusCode){
        return response()->json([
            'status' => 'error',
            'data'   => null,
            'message' => $message,
        ], $statusCode);
    }
}

?>