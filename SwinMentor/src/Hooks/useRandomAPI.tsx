import { useEffect, useState} from "react"
import { useFileContext } from "./Context/useFileContext"
import { NUMBER_OF_API } from "@/config/Constants";


export const useRandomAPI = ()=>{
    const {state,dispatch} = useFileContext();
    const rawAPIString = import.meta.env.VITE_OPEN_ROUTER_API;
    const APIArray = rawAPIString.split(',');
    const [API, setAPI] = useState<string>(APIArray[state.Current_API])
    useEffect(()=>{
        const returnAPI = ()=>{
            if(state.Current_API<NUMBER_OF_API){
                dispatch({type:"SET_CURRENT_API", payload:state.Current_API + 1})
            }else if (state.Current_API = NUMBER_OF_API){
                dispatch({type:"SET_CURRENT_API", payload:state.Current_API - 1 })
            }
            setAPI(APIArray[state.Current_API])
        }
        returnAPI;
    },[state.Current_API])
    return API;
}
