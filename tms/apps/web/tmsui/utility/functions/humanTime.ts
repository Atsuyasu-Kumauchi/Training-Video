export function humanTime(date: Date | string): string {
    const now = new Date();
    const past = typeof date === "string" ? new Date(date) : date;

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: [number, string][] = [
        [60, "秒前"],
        [60, "分前"],
        [24, "時間前"],
        [7, "日前"],
        [4.34524, "週前"],
        [12, "ヶ月前"],
        [Number.POSITIVE_INFINITY, "年前"],
    ];

    let counter = seconds;
    for (let i = 0; i < intervals.length; i++) {
        if (counter < intervals[i][0]) {
            const value = Math.floor(counter);
            const label = intervals[i][1];
            return `${value} ${label}`;
        }
        counter /= intervals[i][0];
    }

    return "たった今";
}
