import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return { time: `${formattedHours}:${formattedMinutes}`, ampm };
    };

    const { time: timeString, ampm } = formatTime(time);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-zinc-800 text-green-400 font-mono rounded p-4">
            <h2 className="text-4xl font-bold">{timeString}</h2>
            <p className="text-sm opacity-70">{ampm}</p>
        </div>
    );
};
export default Clock;
