import Bookmark from "./Bookmark";
import NameAndOnline from "./NameAndOnline";
import UnitTag from "./UnitTag";


const ChatHeader = () =>{
    return (
        <>
            <div>
               <NameAndOnline/>
               <UnitTag />
               <Bookmark />
            </div>
        </>
    )
}

export default ChatHeader;