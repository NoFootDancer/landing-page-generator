<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioslandingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        Schema::create('usuario_landing',function($table){
            $table->increments('id');
            $table->string('nombre_landing')->unique();
            $table->string('redes_twitter');
            $table->string('redes_facebook');
            $table->string('redes_youtube');
            $table->string('contact_telefono');
            $table->string('contact_correo');
            $table->string('contact_nombre');
            
            //Llaves foraneas
                //Usuarios
            $table->integer('usuario_id')->unsigned();
            $table->foreign('usuario_id')->references('id')->on('usuarios');

                //Estilo_Landing
            $table->integer('estilo_id')->unsigned();
            //$table->foreign('estilo_id')->references('id')->on('estilo_landing');


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
        Schema::drop('usuario_landing');
    }
}
