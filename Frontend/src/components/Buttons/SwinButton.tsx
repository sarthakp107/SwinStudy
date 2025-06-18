interface ButtonProps {
    label: string;
    onClick: () => void;
    icon: JSX.Element;  // Accepting a JSX Element for the icon
    isdisabled?: boolean;//Optional parameter we can pass to invoke a disabled Button. Is enabled by default
    disabledLabel?: string //Optional Label if the button is disabled.
}

export const SwinButton = ({ label, onClick, icon, isdisabled = false, disabledLabel = "Processing"}: ButtonProps) => {
    return (
        <>
            {isdisabled ? (
                <button
                    onClick={onClick}
                    className="flex items-center bg-red-500 text-white p-3 rounded-md hover:bg-red-800 transition-colors cursor-not-allowed"
                    disabled = {true}
                >   
                    {/* React Icon */}
                    <span className="mr-2">{icon}</span>
                    
                    {/* Button label */}
                    <span>{disabledLabel}</span>
                </button>
            ):(
                <button
                    onClick={onClick}
                    className="flex items-center bg-red-600 text-white p-3 rounded-md hover:bg-red-800 transition-colors cursor-pointer"
                >   
                    {/* React Icon */}
                    <span className="mr-2">{icon}</span>
                    
                    {/* Button label */}
                    <span>{label}</span>
                </button>
            )}
        </>
    );
};

export const ActionButton = ({ label, onClick, icon }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center bg-red-500 text-white p-3 rounded-md hover:bg-blue-600 hover:scale-105 transform transition-all duration-300 ease-in-out shadow-md hover:shadow-xl focus:outline-none"
        >
            {/* React Icon */}
            <span className="mr-2">{icon}</span>
            
            {/* Button label */}
            <span>{label}</span>
        </button>
    );
};

