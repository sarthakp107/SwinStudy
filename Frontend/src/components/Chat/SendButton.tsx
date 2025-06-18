import { FaRightLong } from "react-icons/fa6"
import { SwinButton } from "../Buttons/SwinButton"

const handleSend=()=>{
    console.log("Sent!")
}

const SendButton = ()=>{
    return(
        <SwinButton label="send" onClick={handleSend} icon={<FaRightLong/>}/>
    )
}

export default SendButton;