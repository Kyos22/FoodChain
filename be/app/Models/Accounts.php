<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
class Accounts extends Authenticatable implements JWTSubject
{
        public $timestamps = false;

        protected $primaryKey = 'id';

        protected $table = 'accounts';
        protected $fillable = [
            'id','fullName','username','password','idRole','nameRole','email','idEmployee','status'
        ];
        protected $hidden = [
            'password',
        ];

        public function getJWTIdentifier()
        {
            return $this->getKey();
        }
        public function getJWTCustomClaims()
        {
            return [];
        }
        // public function getAuthIdentifierName()
        // {
        //     return 'idEmployee';
        // }
        public function role()
        {
            return $this->belongsTo(Role::class, 'idRole');
        }
}
