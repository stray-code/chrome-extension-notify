import { Schedule } from "../types";

export const calcTimeScheduleList = (ScheduleList: Schedule[]) => {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const hasPlusDayScheduleList = ScheduleList.map((schedule) => {
    // スケジュールが日曜日から現在の日時より前の場合
    if (
      schedule.day < day ||
      (schedule.day === day &&
        (schedule.hours < hours ||
          (schedule.hours === hours && schedule.minutes <= minutes)))
    ) {
      const plusDay = 7 - day + schedule.day;

      return {
        plusDay,
        day: schedule.day,
        hours: schedule.hours,
        minutes: schedule.minutes,
        title: schedule.title,
        message: schedule.message,
      };
    }

    // スケジュールが現在の日時から土曜日の場合
    const plusDay = schedule.day - day;

    return {
      plusDay,
      day: schedule.day,
      hours: schedule.hours,
      minutes: schedule.minutes,
      title: schedule.title,
      message: schedule.message,
    };
  });

  const hasTimeScheduleList = hasPlusDayScheduleList.map((schedule) => {
    const date = new Date();

    date.setHours(schedule.hours + schedule.plusDay * 24);
    date.setMinutes(schedule.minutes);
    date.setSeconds(0);

    const time = date.getTime();

    return {
      time,
      day: schedule.day,
      hours: schedule.hours,
      minutes: schedule.minutes,
      title: schedule.title,
      message: schedule.message,
    };
  });

  return hasTimeScheduleList;
};
