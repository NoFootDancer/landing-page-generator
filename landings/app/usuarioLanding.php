<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class usuarioLanding extends Model
{
    //
    protected $table = "usuario_landing";

    public function HasUser(){

    	return $this->belongsTo('App\usuario');
    }
}
