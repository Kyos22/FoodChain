<?php

namespace App\Http\Services;

use App\Models\Accounts;
use Illuminate\Http\Request;

class AccountService 
{
    public static function createAccount(array $accountData){
        // $accountData[]
        $account = Accounts::create($accountData);
        return $account;
    }
    public static function findAccountByIdEmployee($idEmployee){
        $account = Accounts::where('idEmployee',$idEmployee) ->first();
        if($account){
            return $account;
        }else{
            return false;
        }
    }
}

?>
