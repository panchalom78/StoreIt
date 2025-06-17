const StorageCircle = ({ percent = 75 }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative w-40 h-40">
            <svg width="100%" height="100%" viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    // stroke="#e5e7eb"
                    strokeWidth="15"
                    fill="none"
                    className="stroke-white/10"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-white"
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-white text-center">
                {percent}%<br />
                space used
            </div>
        </div>
    );
};

export default StorageCircle;
