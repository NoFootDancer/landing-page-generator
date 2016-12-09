<?php

namespace App\Http\Middleware;

use Closure;
use App\usuario;

class CheckUserName
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

        $Name = usuario::where('username',$request->uname)->first();

        if($Name == null){
            return $next($request);
        }else{
            $p ="Username in use";
            return response($p);
        }
    }
}
