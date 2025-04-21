import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
interface FeatureCardProps{
    label: string;
    icon: ReactElement
    linkto: string
    iconClassname?: string
}

const FeatureCard = ({label, icon, linkto, iconClassname}: FeatureCardProps) =>{
    const styledIcon = React.cloneElement(icon, {
        className: iconClassname,
      })
    return (
    <>
            <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg cursor-pointer">
                 <Link to={linkto} className="w-full h-full flex flex-col items-center justify-center"> 
                 <div className="w-10 h-10 mb-3 text-red" >
                 {styledIcon}
                 </div>
                     <span className="text-lg font-semibold">{label}</span>
                 </Link>
            </div>
    </>
    )
}

export default FeatureCard;