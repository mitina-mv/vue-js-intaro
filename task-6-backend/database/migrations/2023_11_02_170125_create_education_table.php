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
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->enum('level', ['middle', 'middleSpec', 'semiHigh', 'universe']);
            $table->string('institution');
            $table->string('faculty');
            $table->string('specialization');
            $table->integer('end_year');
            $table->foreignId('resume_id')
                ->constrained('resumes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education');
    }
};
