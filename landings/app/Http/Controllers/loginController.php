<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\usuario;
use Auth;

class loginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function LogUser(Request $request){
        
        if(Auth::attempt(['username'=>$request->uname, 'password'=>$request->pw], true)){
            return response()->json(Auth::user());
        }else{
            $p = "User doesn't exist / Invalid Pw";

            return response($p);

        }

    }

    public function current(Request $request){

        if(Auth::user()){

            return response()->json(Auth::user());
            
        }else{

            $p = "Not logged in";

            return response($p);

        }

        


    }

    public function logout(Request $request){

        Auth::logout();

        return response()->json(Auth::user());
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $User = new usuario();
        $User->nombres = $request->fname;
        $User->apellidos = $request->lname;
        $User->username = $request->uname;
        $User->email = $request->email;
        $User->telefono = $request->telephone;
        $User->password = bcrypt($request->pw);
        $User->rol_id = 2;
        $User->save();

        return response()->json($User);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
