<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Allownullsocialmedia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('usuario_landing',function($table){
            $table->string('redes_twitter')->nullable(true)->change();
            $table->string('redes_facebook')->nullable(true)->change();
            $table->string('redes_youtube')->nullable(true)->change();

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
        Schema::table('usuario_landing',function($table){

            $table->string('redes_twitter')->nullable(true)->change();
            $table->string('redes_facebook')->nullable(true)->change();
            $table->string('redes_youtube')->nullable(true)->change();
        });
    }
}
