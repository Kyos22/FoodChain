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
        Schema::table('accounts', function (Blueprint $table) {
            // Thêm cột idRole vào bảng accounts
            $table->unsignedBigInteger('idRole')->nullable(); 

            // Tạo khóa ngoại cho cột idRole
            $table->foreign('idRole')->references('id')->on('role')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            // Xóa khóa ngoại và cột idRole khi rollback
            $table->dropForeign(['idRole']);
            $table->dropColumn('idRole');
        });
    }
}


?>