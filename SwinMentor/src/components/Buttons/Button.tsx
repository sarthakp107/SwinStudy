

interface ButtonProps {
    label: string;
    onClick: () => void;
    icon: JSX.Element;  // Accepting a JSX Element for the icon
}

export const Button = ({ label, onClick, icon }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
        >
            {/* React Icon */}
            <span className="mr-2">{icon}</span>
            
            {/* Button label */}
            <span>{label}</span>
        </button>
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

