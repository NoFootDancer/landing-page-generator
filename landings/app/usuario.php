<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class usuario extends Model
{
    //
protected $table = 'usuarios';

public function haslandings(){
	return $this->hasMany('App\usuarioLanding');
}

}
