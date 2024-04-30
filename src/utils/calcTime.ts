import { Schedule } from "../types";

export const calcTime = (schedule: Schedule, plusDay: number) => {
  const date = new Date();

  date.setHours(schedule.hours + plusDay * 24);
  date.setMinutes(schedule.minutes);
  date.setSeconds(0);

  const time = date.getTime();

  return time;
};
