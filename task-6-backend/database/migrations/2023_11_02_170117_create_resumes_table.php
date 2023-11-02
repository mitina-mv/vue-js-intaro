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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['new','interview','adopted','refused']);
            $table->string('profession');
            $table->string('city');
            $table->string('photo_path');
            $table->string('full_name');
            $table->string('phone');
            $table->string('email');
            $table->date('birthdate');
            $table->decimal('salary');
            $table->json('skills');
            $table->enum('work_schedule', ['full', 'flexible', 'shift', 'remote', 'watch']);
            $table->text('about');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
