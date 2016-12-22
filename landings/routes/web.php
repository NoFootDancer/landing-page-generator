<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::resource('register','loginController');
Route::post('register',['middleware' =>'namexist', 'uses'=>'loginController@store']);
Route::post('login','loginController@LogUser');
Route::get('current','loginController@current');
Route::get('currentid','loginController@currentId');
Route::get('logout','loginController@logout');
Route::resource('make-landing','usuarioLandingController');
Route::get('Landing-Page/{nombre_landing}', 'usuarioLandingController@showByName');
Route::get('Landing-Page/{username}/{nombre_landing}', 'usuarioLandingController@showByNames');
Route::resource('Landing-Contact', 'contactoController');
Route::get('Landing-count/{id}','usuarioLandingController@CountLandings');
Route::post('Verify','usuarioLandingController@VerifyLanding');
Route::put('updatelanding','usuarioLandingController@LandingUpdateData');
Route::get('my-landings/{id}','usuarioLandingController@ShowMyLandings');
Route::post('make-landing',['middleware'=>'landexist', 'uses'=>'usuarioLandingController@store']);
