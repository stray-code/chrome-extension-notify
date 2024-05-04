import { calcPlusDay, calcTime } from ".";
import type { Schedule } from "../types";

export const calcTimeScheduleList = (ScheduleList: Schedule[]) => {
  const hasTimeScheduleList = ScheduleList.map((schedule) => {
    const plusDay = calcPlusDay(schedule);
    const time = calcTime(schedule, plusDay);

    return {
      ...schedule,
      time,
    };
  });

  return hasTimeScheduleList;
};
