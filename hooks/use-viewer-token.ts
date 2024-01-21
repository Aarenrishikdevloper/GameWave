import {useEffect, useState} from "react";
import {createViewerToken} from "@/action/token";
import{JwtPayload, jwtDecode} from "jwt-decode";
import {toast} from "sonner";

export const useViewerToken =(hostindentity:string)=> {
    const [token, setToken] = useState("");
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');
    useEffect(() => {
        const createToken = async()=>{
            try {
                const viewertoken = await createViewerToken(hostindentity)
                setToken(viewertoken);
                const decodetoken = jwtDecode(viewertoken) as JwtPayload &{name?:string}
                const name  = decodetoken?.name;
                const identity = decodetoken?.jti;
                if(identity){
                    // @ts-ignore
                    setIdentity(identity);


                }
                if(name){
                    setName(name)
                }
            }catch (e) {
               toast.error("something went wrong")
            }
        }
        createToken();
    }, [hostindentity]);

    return{
        token,
        name,
        identity,
    }
}