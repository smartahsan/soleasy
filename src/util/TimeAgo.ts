export function timeAgo(unixTimestamp: number): string {
    const now = Date.now() / 1000;
    const diffInSeconds = Math.floor(now - unixTimestamp);

    const seconds = diffInSeconds;
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
      return `Sent ${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `Sent ${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `Sent ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Sent ${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  }