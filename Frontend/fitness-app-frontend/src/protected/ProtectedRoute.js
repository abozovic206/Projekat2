//Zastita stranice u React aplikaciji

import {useSelector} from 'react-redux';//react HOOK koji omoguceva da pristupimo Redux stanju
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute=({children})=>{
    const token=useSelector((state)=>state.auth.token);
    const location=useLocation(); //Cuva trenutnu URL

    if(!token){
        //Ako korisnik nije prijavljen ne dozvoljavamo mu pristup zasticenim stranicama
        //Ako nije prijavljen i pokusa da ide na neku zasticenu stranicu, vraca se na onu pocetnu
        return <Navigate to="/" state={{from: location}}replace/>
    }

    return children;//Children je dijete komponenta koja se nalazi unutar elementa protectedRoute
}

export default ProtectedRoute;



