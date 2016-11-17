<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Userchangestuff extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('usuarios',function($table){

            $table->renameColumn('ape_mat','apellidos');
            $table->dropColumn('ape_pat');


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
        Schema::table('usuarios',function($table){

            $table->string('ape_pat');
            $table->renameColumn('apellidos','ape_mat');
        });
    }
}
