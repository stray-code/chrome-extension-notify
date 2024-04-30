import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { Schedule } from "../types";
import { calcPlusDay } from ".";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it("スケジュールが現在の日時から土曜日までの場合、差分の日数が返る", () => {
  vi.setSystemTime(new Date("2024/05/01 09:00:00"));

  const schedule: Schedule = {
    day: 3,
    hours: 20,
    minutes: 0,
    title: "title",
    message: "message",
  };

  expect(calcPlusDay(schedule)).toEqual(0);
});

it("スケジュールが現在の日時から土曜日までの場合、差分の日数が返る", () => {
  vi.setSystemTime(new Date("2024/05/01 09:00:00"));

  const schedule: Schedule = {
    day: 6,
    hours: 2,
    minutes: 30,
    title: "title",
    message: "message",
  };

  expect(calcPlusDay(schedule)).toEqual(3);
});

it("スケジュールが日曜日から現在の日時より前の場合、7引く差分の日数が返る", () => {
  vi.setSystemTime(new Date("2024/05/01 09:00:00"));

  const schedule: Schedule = {
    day: 0,
    hours: 20,
    minutes: 0,
    title: "title",
    message: "message",
  };

  expect(calcPlusDay(schedule)).toEqual(4);
});

it("スケジュールが日曜日から現在の日時より前の場合、7引く差分の日数が返る", () => {
  vi.setSystemTime(new Date("2024/05/01 09:00:00"));

  const schedule: Schedule = {
    day: 3,
    hours: 2,
    minutes: 30,
    title: "title",
    message: "message",
  };

  expect(calcPlusDay(schedule)).toEqual(7);
});
