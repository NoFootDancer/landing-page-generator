<?php
//Controller made only for landing page creation/Edition & Deletion
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\usuarioLanding;
use App\usuario;
use Auth;

class usuarioLandingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $NewLand = new usuarioLanding();
        $NewLand->nombre_landing = $request->name;
        $NewLand->redes_twitter = $request->tw;
        $NewLand->redes_facebook = $request->fb;
        $NewLand->redes_youtube = $request->yt;
        $NewLand->contact_telefono = $request->cphone;
        $NewLand->contact_correo = $request->cemail;
        $NewLand->contact_nombre = $request->cname;
        $NewLand->usuario_id = Auth::user()->id;
        $NewLand->estilo_id = 1;
        $NewLand->titulo_landing = $request->title;
        $NewLand->hyperlink = $request->link;
        $NewLand->save();

        return response()->json($NewLand);
    }

    public function showByName($name){
        $Land = usuarioLanding::where('nombre_landing',$name)->first();
        
        if($Land){

            return response()->json($Land);

        }else{

            $p = "This landing page doesn't exists";

            return response($p);
        }
        
    }

    public function VerifyLanding(Request $request){

        $Landing = usuarioLanding::where('nombre_landing',$request['data']['nombre_landing'])->first();

        if($Landing->usuario_id == $request->number){
            
            return response()->json($Landing);

        }else{
            $p = "It's not his landing";
            return response($p);
        }

        

    }

    public function CountLandings($id){

        $Landings = usuario::with('haslandings')->where('id',$id)->get();

        foreach($Landings as $land){

            $nb = $land->haslandings->count();
        }

        return response()->json($nb);

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

    public function LandingUpdateData(Request $request){

        $Landing = usuarioLanding::find($request->id);

        $Landing->redes_twitter = $request->tw;
        $Landing->redes_facebook = $request->fb;
        $Landing->redes_youtube = $request->yt;
        $Landing->contact_telefono = $request->cphone;
        $Landing->contact_correo = $request->cemail;
        $Landing->contact_nombre = $request->cname;
        $Landing->estilo_id = 1;
        $Landing->titulo_landing = $request->title;
        $Landing->hyperlink = $request->link;
        $Landing->save();
        return response()->json($Landing);

    }

    public function ShowMyLandings(Request $request){
        $Landings = usuarioLanding::where('usuario_id',$request->id)->get();
        return response()->json($Landings);
    }
}
