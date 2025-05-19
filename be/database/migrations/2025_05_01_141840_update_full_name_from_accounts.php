<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->renameColumn('username','UserName');
        });
    }
    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->renameColumn('UserName','username');
        });
    }
};
