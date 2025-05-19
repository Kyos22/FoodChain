<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table -> id();
            $table -> string('nameProduct')->nullable();
            $table -> float('price')->nullable();
            $table -> string('unit')->nullable();
            $table -> string('image')->nullable();
            $table -> string('description')->nullable();
            $table -> string('status')->nullable();
            $table -> string('idCategory')->nullable();
            $table -> string('nameCategory')->nullable();
            $table -> string('idSupplier')->nullable();
            $table -> string('nameSupplier')->nullable();
            $table -> timestamp('created_at')->default(now());
            $table -> timestamp('updated_at')->default(now());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'nameProduct',
                'price',
                'unit',
                'image',
                'description',
                'status',
                'idCategory',
                'nameCategory',
                'idSupplier',
                'nameSupplier',
            ]);
        });
        // Schema::dropIfExists('products');
    }
};
