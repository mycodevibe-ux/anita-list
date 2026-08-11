export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
