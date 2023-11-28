export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    const formattedDate = formatter.format(date)

    // Extracting and formatting individual components
    const [weekday, month, day] = formattedDate.split(' ')
    const abbreviatedWeekday = weekday.substring(0, 2) // Take the first two characters of the weekday

    return `${abbreviatedWeekday}, ${day} ${month}`
}

export function getDiffTime(date1: Date, date2: Date): string {
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())

    const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}:${minutes}`
}

export function formatDiffTime(time: string): string {
    // const [hoursStr, minutesStr] = time.split(':');
    // const hours = parseInt(hoursStr, 10);
    // const minutes = parseInt(minutesStr || '0', 10);

    // if (hours >= 24) {
    //   return `${hours} hours`;
    // } else {
    //   if (minutes === 0) {
    //     return `${hours} hour${hours > 1 ? 's' : ''}`;
    //   } else {
    //     return `${hours}:${minutes}`;
    //   }
    // }

    const [hoursStr, minutesStr] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr || '0', 10);

    if (hours >= 24) {
        return `${hours} hours`;
    } else {
        if (minutes === 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            // Pad minutes with a leading zero if less than 10
            const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            return `${hours}:${formattedMinutes}`;
        }
    }
}