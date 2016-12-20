<?php

namespace App\Http\Middleware;

use Closure;
use App\usuarioLanding;

class CheckLandingName
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $Name = usuarioLanding::where('nombre_landing',$request->name)->first();

        if($Name == null){
            return $next($request);
        }else{
            $p ="Landing in use";
            return response($p);
        }
        return $next($request);
    }
}
