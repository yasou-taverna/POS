<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('type', ['receipt', 'kitchen']);
            $table->string('printer_name')->nullable();
            $table->string('printer_host')->nullable();
            $table->integer('printer_port')->nullable();
            $table->enum('status', ['queued', 'sent', 'failed'])->default('queued');
            $table->longText('payload');
            $table->text('error')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_jobs');
    }
};
