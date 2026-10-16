import { useState, useEffect } from 'react';

export interface CampusStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
  currentUKTime: string;
  rushLevel: 'Low' | 'Moderate' | 'Peak' | 'Closed';
  estWaitMins: number;
  rushDescription: string;
  dayName: string;
  openHourStr: string;
  closeHourStr: string;
}

export function useCampusStatus(): CampusStatus {
  const [status, setStatus] = useState<CampusStatus>(getUKStatus());

  useEffect(() => {
    // Update every 30 seconds
    const interval = setInterval(() => {
      setStatus(getUKStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

function getUKStatus(): CampusStatus {
  try {
    // Format to UK local time
    const now = new Date();
    const ukDateStr = now.toLocaleString('en-US', { timeZone: 'Europe/London' });
    const ukDate = new Date(ukDateStr);

    const day = ukDate.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = ukDate.getHours();
    const minutes = ukDate.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const isWeekend = day === 0 || day === 6;
    const openTimeMinutes = isWeekend ? 10 * 60 : 8 * 60; // 10:00 or 08:00
    const closeTimeMinutes = isWeekend ? 18 * 60 : 19 * 60; // 18:00 or 19:00

    const openHourStr = isWeekend ? '10:00' : '08:00';
    const closeHourStr = isWeekend ? '18:00' : '19:00';

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[day];

    const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    const isOpen = totalMinutes >= openTimeMinutes && totalMinutes < closeTimeMinutes;

    let statusText = isOpen ? 'Open Now' : 'Closed';
    let nextChangeText = '';

    if (isOpen) {
      const minutesUntilClose = closeTimeMinutes - totalMinutes;
      if (minutesUntilClose < 60) {
        nextChangeText = `Closes in ${minutesUntilClose} min (${closeHourStr})`;
      } else {
        const hoursLeft = Math.floor(minutesUntilClose / 60);
        const minsRemaining = minutesUntilClose % 60;
        nextChangeText = `Open until ${closeHourStr} (${hoursLeft}h ${minsRemaining > 0 ? `${minsRemaining}m ` : ''}left)`;
      }
    } else {
      if (totalMinutes < openTimeMinutes) {
        const minutesUntilOpen = openTimeMinutes - totalMinutes;
        nextChangeText = `Opens today at ${openHourStr} (in ${Math.floor(minutesUntilOpen / 60)}h ${minutesUntilOpen % 60}m)`;
      } else {
        const nextDayName = day === 5 ? 'Saturday' : day === 6 ? 'Sunday' : 'tomorrow';
        const nextOpenTime = (day === 5 || day === 6) ? '10:00' : (day === 0 ? '08:00' : '08:00');
        nextChangeText = `Opens ${nextDayName} at ${nextOpenTime}`;
      }
    }

    // Rush Hour determination
    let rushLevel: 'Low' | 'Moderate' | 'Peak' | 'Closed' = 'Closed';
    let estWaitMins = 0;
    let rushDescription = 'Kitchen currently closed. Online orders queue for opening.';

    if (isOpen) {
      if (hours >= 12 && (hours < 13 || (hours === 13 && minutes <= 45))) {
        rushLevel = 'Peak';
        estWaitMins = 10;
        rushDescription = 'Lunch Rush: Central atrium busy with lecture breaks. Stone-oven pizzas ~10 mins.';
      } else if ((hours === 8 && minutes >= 30) || (hours === 9 && minutes <= 30)) {
        rushLevel = 'Moderate';
        estWaitMins = 5;
        rushDescription = 'Morning Breakfast Rush: McGhee rolls & fresh coffee running hot.';
      } else if (hours >= 17 && hours < 18 && minutes >= 30) {
        rushLevel = 'Moderate';
        estWaitMins = 6;
        rushDescription = 'Evening Campus Scran: Student society dinner orders.';
      } else {
        rushLevel = 'Low';
        estWaitMins = 2;
        rushDescription = 'Grab-and-Go Sweet Spot: Minimal wait times at all counter hatches!';
      }
    }

    return {
      isOpen,
      statusText,
      nextChangeText,
      currentUKTime: `${timeFormatted} UK`,
      rushLevel,
      estWaitMins,
      rushDescription,
      dayName,
      openHourStr,
      closeHourStr,
    };
  } catch {
    return {
      isOpen: true,
      statusText: 'Open Now',
      nextChangeText: 'Mon-Fri 08:00-19:00',
      currentUKTime: 'Stirling Local Time',
      rushLevel: 'Low',
      estWaitMins: 3,
      rushDescription: 'Campus Central Floor G is serving fresh food and barista coffee.',
      dayName: 'Weekday',
      openHourStr: '08:00',
      closeHourStr: '19:00',
    };
  }
}
