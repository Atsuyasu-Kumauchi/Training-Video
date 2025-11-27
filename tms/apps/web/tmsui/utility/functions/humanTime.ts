export function humanTime(date: Date | string): string {
    const now = new Date();
    const past = typeof date === "string" ? new Date(date) : date;

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: [number, string][] = [
        [60, "second"],
        [60, "minute"],
        [24, "hour"],
        [7, "day"],
        [4.34524, "week"],
        [12, "month"],
        [Number.POSITIVE_INFINITY, "year"],
    ];

    let counter = seconds;
    for (let i = 0; i < intervals.length; i++) {
        if (counter < intervals[i][0]) {
            const value = Math.floor(counter);
            const label = intervals[i][1];
            return `${value} ${label}${value !== 1 ? "s" : ""} ago`;
        }
        counter /= intervals[i][0];
    }

    return "just now";
}
