interface ProgressRingProps {
    value: number;
    maxValue: number;
    label: string;
    color: string; 
    icon?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ value, maxValue, label, color, icon }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const normalizedValue = Math.min(value, maxValue);
    const progress = maxValue === 0 ? 0 : (normalizedValue / maxValue) * circumference;
    const strokeDashoffset = circumference - progress;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke ={color.includes('red') ? '#dc2626' : '#2563eb'}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800">
                    {icon && <div className={`text-3xl ${color} mb-1`}>{icon}</div>}
                    <span className="text-xl font-bold">{value}</span>
                    <span className="text-sm text-gray-500">/ {maxValue}</span>
                </div>
            </div>
            <p className="mt-2 text-md font-medium text-gray-700">{label}</p>
        </div>
    );
};