import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import clsx from 'clsx';

type CountdownTimerProps = {
  endTime: number;
  onExpire?: () => void;
  large?: boolean;
};

export default function CountdownTimer({ endTime, onExpire, large }: CountdownTimerProps) {
  const calc = () => {
    const diff = endTime - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      expired: false,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    if (time.expired) {
      onExpire && onExpire();
      return;
    }
    const interval = setInterval(() => {
      const next = calc();
      setTime(next);
      if (next.expired && onExpire) onExpire();
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, time.expired]);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (time.expired) {
    return (
      <span className={clsx('text-gray-400 font-bold', large && 'text-xl')}>
        Auction Ended
      </span>
    );
  }

  const urgent = time.h === 0 && time.m < 5;

  return (
    <div className={clsx('flex items-center gap-2', large ? 'text-2xl font-mono font-bold' : 'text-sm font-mono font-bold')}>
      <Clock size={large ? 20 : 14} className={urgent ? 'text-red-500 animate-pulse' : 'text-vccp-gold'} />
      <span className={clsx(urgent ? 'text-red-500' : 'text-vccp-gold')}>
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </span>
      {urgent && <span className="text-red-500 text-xs font-normal ml-1 animate-pulse">Ending soon!</span>}
    </div>
  );
}
