<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['recipe_id']);
            $table->foreignId('recipe_id')->nullable()->change();
            $table->foreign('recipe_id')->references('id')->on('recipes')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['recipe_id']);
            $table->foreignId('recipe_id')->nullable(false)->change();
            $table->foreign('recipe_id')->references('id')->on('recipes')->cascadeOnDelete();
        });
    }
};
