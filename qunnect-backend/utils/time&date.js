export const timeAgo=(created_at)=> {
  const createdAt = new Date(created_at);
  const now = new Date();
  
  const diffInMilliseconds = now - createdAt;

  // Handle negative time differences (future dates) gracefully
  if (diffInMilliseconds < 0) {
    return "In the future";
  }

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  // Conditional logic for time units (more efficient)
  const seconds = diffInSeconds % 60;
  const minutes = Math.floor(diffInSeconds / 60) % 60;
  const hours = Math.floor(diffInSeconds / (60 * 60)) % 24;
  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years + (years > 1 ? " years ago" : " year ago");
  } else if (months > 0) {
    return months + (months > 1 ? " months ago" : " month ago");
  } else if (days > 0) {
    return days + (days > 1 ? " days ago" : " day ago");
  } else if (hours > 0) {
    return hours + (hours > 1 ? " hours ago" : " hour ago");
  } else if (minutes > 0) {
    return minutes + (minutes > 1 ? " minutes ago" : " minute ago");
  } else {
    return "just now";
  }
}