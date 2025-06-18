import { Action, FileState, fileReducer, initialFileState } from "@/reducers/fileReducer"
import React, {createContext, useReducer, ReactNode} from "react"

type FileContextType={
    state: FileState
    dispatch: React.Dispatch<Action>
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({children}:{children:ReactNode}) =>{
    const [state, dispatch] = useReducer(fileReducer, initialFileState)
    return(
        <FileContext.Provider value={{state, dispatch}}>
            {children}
        </FileContext.Provider>
    );
};