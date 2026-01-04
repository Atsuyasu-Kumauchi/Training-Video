/**
 * Formats an ISO date string (e.g., 2026-01-04T09:37:19.377Z) to "YYYY-MM-DD" format.
 * Example: "2026-01-04T09:37:19.377Z" => "2026-01-04"
 * If the date is invalid, returns an empty string.
 */
export function formateDate(dateString: string | Date): string {
    let date: Date;
    if (typeof dateString === "string") {
        date = new Date(dateString);
    } else {
        date = dateString;
    }

    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

