import { calcTimeScheduleList, getLocalStorage } from "./utils";

import type { Message, Schedule } from "./types";

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

let nextSchedule: Schedule & { time: number };

const createAlarm = async () => {
  const mainScheduleList = await getLocalStorage("mainScheduleList");

  if (!mainScheduleList || mainScheduleList.length === 0) {
    return;
  }

  const scheduleList: Schedule[] = mainScheduleList.flatMap((schedule) => {
    return schedule.daysOfWeek.map((day) => {
      return {
        day: +day,
        hours: +schedule.hours,
        minutes: +schedule.minutes,
        title: schedule.title,
        message: schedule.message,
      };
    });
  });

  const hasTimeScheduleList = calcTimeScheduleList(scheduleList);

  const sortedScheduleList = hasTimeScheduleList.toSorted(
    (a, b) => a.time - b.time,
  );

  nextSchedule = sortedScheduleList[0];

  await chrome.alarms.create("createNotifications", {
    when: nextSchedule.time,
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "createNotifications") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "img/icon128.png",
      title: nextSchedule.title,
      message: `${nextSchedule.message}\n${nextSchedule.hours}時${nextSchedule.minutes}分`,
      priority: 0,
    });

    createAlarm();
  }
});

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (message.type === "updateAlarm") {
    await chrome.alarms.clearAll();
    createAlarm();
  }
});

createAlarm();
