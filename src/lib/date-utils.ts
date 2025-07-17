/**
 * Check if a date is considered "new" (uploaded within last 7 days)
 */
export const isNew = (dateUploadedUnix: number): boolean => {
  const now = Date.now() / 1000; // Convert to Unix timestamp
  const daysDifference = (now - dateUploadedUnix) / (24 * 60 * 60);
  return daysDifference <= 7;
};

/**
 * Check if a date is very recent (uploaded within last 24 hours)
 */
export const isVeryRecent = (dateUploadedUnix: number): boolean => {
  const now = Date.now() / 1000; // Convert to Unix timestamp
  const hoursDifference = (now - dateUploadedUnix) / (60 * 60);
  return hoursDifference <= 24;
};

/**
 * Format relative time from Unix timestamp
 */
export const formatRelativeTime = (dateUploadedUnix: number): string => {
  const now = Date.now() / 1000;
  const secondsDifference = now - dateUploadedUnix;

  if (secondsDifference < 60) {
    return "Just now";
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes}m ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours}h ago`;
  } else if (secondsDifference < 604800) {
    const days = Math.floor(secondsDifference / 86400);
    return `${days}d ago`;
  } else {
    const weeks = Math.floor(secondsDifference / 604800);
    return `${weeks}w ago`;
  }
};
