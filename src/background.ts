import { calcTimeScheduleList, getLocalStorage } from "./utils";

import type { Message, Schedule } from "./types";

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

const createAlarm = async () => {
  await chrome.alarms.clearAll();

  const mainScheduleList = await getLocalStorage("mainScheduleList");

  if (!mainScheduleList || mainScheduleList.length === 0) {
    return;
  }

  const scheduleList: Schedule[] = mainScheduleList.flatMap((schedule) => {
    return schedule.daysOfWeek.map((day) => {
      return {
        day: +day,
        mainScheduleId: schedule.id,
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

  const nextSchedule = sortedScheduleList[0];

  // 通知データをローカルストレージから取得するために、アラームのnameはidを指定する
  await chrome.alarms.create(nextSchedule.mainScheduleId, {
    when: nextSchedule.time,
  });
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const mainScheduleList = await getLocalStorage("mainScheduleList");

  if (!mainScheduleList) {
    return;
  }

  const targetMainSchedule = mainScheduleList.find(
    (mainSchedule) => mainSchedule.id === alarm.name,
  );

  if (!targetMainSchedule) {
    return;
  }

  chrome.notifications.create({
    type: "basic",
    iconUrl: "img/icon128.png",
    title: targetMainSchedule.title,
    message: `${targetMainSchedule.message}\n${targetMainSchedule.hours}時${targetMainSchedule.minutes}分`,
    priority: 0,
  });

  createAlarm();
});

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (message.type === "updateAlarm") {
    createAlarm();
  }
});

createAlarm();
