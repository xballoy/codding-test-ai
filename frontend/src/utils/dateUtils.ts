export const formatDate = (dateString: string, timezone: string): string => {
    try {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: timezone,
        }).format(date);
    } catch (e) {
        console.error('Date formatting error:', e);
        return 'Invalid date';
    }
};
