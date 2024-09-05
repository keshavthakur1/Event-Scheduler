
const convertToTime = (time) => {
    const [hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
    let convertedHours = period === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours);
    if (period === 'AM' && hours === '12') convertedHours = 0;
    return new Date(`1970-01-01T${String(convertedHours).padStart(2, '0')}:${minutes}:00`);
};

exports.hasConflict = (newStart, newEnd, events) => {
    const newStartTime = convertToTime(newStart);
    const newEndTime = convertToTime(newEnd);

    
    for (let event of events) {
        const existingStartTime = convertToTime(event.start);
        const existingEndTime = convertToTime(event.end);

        if (
            (newStartTime >= existingStartTime && newStartTime < existingEndTime) || 
            (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||     
            (newStartTime <= existingStartTime && newEndTime >= existingEndTime)     
        ) {
            return true;
        }
    }
    return false;
};
