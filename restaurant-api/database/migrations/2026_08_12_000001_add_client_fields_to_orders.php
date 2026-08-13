<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('client_order_id')->nullable()->unique()->after('id');
            $table->string('customer_name')->nullable()->after('table_number');
            $table->integer('guests')->nullable()->after('customer_name');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropUnique(['client_order_id']);
            $table->dropColumn(['client_order_id', 'customer_name', 'guests']);
        });
    }
};
