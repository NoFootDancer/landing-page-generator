<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactolandingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('contacto_landing',function($table){
            $table->increments('id');
            $table->string('nombre');
            $table->string('correo');
            $table->string('comentarios');

            //Llaves foraneas
                //Usuario_Landing
            $table->integer('landing_id')->unsigned();
            $table->foreign('landing_id')->references('id')->on('usuario_landing');
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
        Schema::drop('contacto_landing');
    }
}
