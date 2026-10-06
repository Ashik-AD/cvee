export function getLastModifiedTime(timeStamp: string | Date) {
  if (!timeStamp?.toString().trim()) return;

  const date = new Date(timeStamp);
  const now = new Date();

  if (Number.isNaN(date.getTime())) return;

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Handle future dates
  if (diffInSeconds < 0) return "just now";

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 60 / 60);
  const days = Math.floor(seconds / 60 / 60 / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years === 1 ? "" : "s"} ago`;
  if (months > 0) return `${months} month${months === 1 ? "" : "s"} ago`;
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
}
