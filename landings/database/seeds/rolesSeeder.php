<?php

use Illuminate\Database\Seeder;
use App\roles;
class rolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data=[['descripcion'=>'Admin'],['descripcion'=>'User']];
        roles::insert($data);
    }
}
