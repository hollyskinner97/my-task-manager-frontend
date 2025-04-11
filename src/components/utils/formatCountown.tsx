import {
  differenceInSeconds,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from "date-fns";

export default function formatCountdown(deadline: Date | null): string {
  if (!deadline) return "";

  const now = new Date();
  const secondsLeft = differenceInSeconds(deadline, now);

  if (secondsLeft <= 0) return "Deadline reached!";

  if (differenceInDays(deadline, now) >= 7) {
    return `${differenceInWeeks(deadline, now)}w`;
  } else if (differenceInDays(deadline, now) >= 1) {
    return `${differenceInDays(deadline, now)}d`;
  } else if (differenceInHours(deadline, now) >= 1) {
    const hrs = differenceInHours(deadline, now);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    return `${hrs}h ${mins}m`;
  } else {
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}
