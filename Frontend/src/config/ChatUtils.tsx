export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const msgDate = new Date(date);

  const isToday =
    now.toDateString() === msgDate.toDateString();

  const isYesterday =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString() ===
    msgDate.toDateString();

  const timeString = msgDate.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today at ${timeString}`;
  if (isYesterday) return `Yesterday at ${timeString}`;

  const dateString = msgDate.toLocaleDateString("en-AU", {
    month: "short",
    day: "numeric",
  });

  return `${dateString} at ${timeString}`;
};
