<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('usuarios',function($table){
            $table->increments('id');
            $table->string('nombres');
            $table->string('ape_mat');
            $table->string('ape_pat');
            $table->string('email');
            $table->string('telefono');
            $table->string('password');
            $table->string('username')->unique();

            //Llaves foraneas
            $table->integer('rol_id')->unsigned();
            $table->foreign('rol_id')->references('id')->on('roles');





        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('usuarios');
    }
}
