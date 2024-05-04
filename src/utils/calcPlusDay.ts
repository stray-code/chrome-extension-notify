import type { Schedule } from "../types";

export const calcPlusDay = (schedule: Schedule) => {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  // スケジュールが日曜日から現在の日時より前の場合
  if (
    schedule.day < day ||
    (schedule.day === day &&
      (schedule.hours < hours ||
        (schedule.hours === hours && schedule.minutes <= minutes)))
  ) {
    const plusDay = 7 - (day - schedule.day);

    return plusDay;
  }

  // スケジュールが現在の日時から土曜日の場合
  const plusDay = schedule.day - day;

  return plusDay;
};
