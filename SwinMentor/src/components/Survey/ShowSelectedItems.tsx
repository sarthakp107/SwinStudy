interface ShowSelectedItemsProps {
    selectedItems: string[];
    onRemove: (item: string) => void;
    label?: string; //Can Pass Custom Label. Defaulted to Select...
    numberOfItems?: number; //Can Pass Number of options (boxes) to show. Defaulted to 4
}

export const ShowSelectedItems: React.FC<ShowSelectedItemsProps> = ({ selectedItems, onRemove, label="Select...", numberOfItems=4 }) => {
    return (
    <>
        <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: numberOfItems }).map((_, index) => {
                    const item = selectedItems[index];
                    return (
                        <div
                            key={index}
                            className={`flex justify-center items-center h-24 w-full border-2 rounded-lg shadow-md transition-all ${
                                item
                                    ? "bg-purple-100 border-red-400 text-purple-700 font-medium"
                                    : "border-dashed border-gray-400 text-gray-400"
                            }`}
                        >
                            {item ? (
                                <div className="flex justify-between items-center w-full px-4">
                                    <span>{item}</span>
                                    <button
                                        onClick={() => onRemove(item)}
                                        className="text-purple-800 hover:text-purple-900 focus:outline-none"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ) : (
                                <span className="text-sm">{label}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </>
    );
};
