import { FileContext } from "@/context/FileContext"
import { useContext } from "react"

export const useFileContext = () =>{
   const context = useContext(FileContext)

   if (!context){
    throw new Error ("Context must be used with a provider")
   }

   return context
};