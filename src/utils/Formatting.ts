// FORMAT TIME FROM STRING (e.g. 04:00 PM => 4:00 PM)
export function formatTime(time: string): string {
  if (Number(time[0]) > 0) return time;
  return time.substring(1);
}

export function formatDate(date: string): string {
  if (Number(date[0]) > 0) return date;
  return date.substring(1);
}
