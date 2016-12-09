<?php

use Illuminate\Database\Seeder;
use App\estiloLanding;

class estilos_landing extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = [['descripcion'=>'default']];

        estiloLanding::insert($data);
    }
}
