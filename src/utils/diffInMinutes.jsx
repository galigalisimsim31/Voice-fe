export const diffInMinutes = (dateStr) => {
    if (!dateStr) return false;

    const scheduledTime = new Date(dateStr).getTime(); // your scheduled time
    const currentTime = new Date().getTime();              // now
    const diffInMs = scheduledTime - currentTime;
    const diffInMinutes = diffInMs / (1000 * 60);           // convert ms to minutes

    return parseInt(diffInMinutes);
};