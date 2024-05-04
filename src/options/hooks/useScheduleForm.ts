import { useForm } from "@mantine/form";

import { randomId } from "@mantine/hooks";
import type { MainSchedule } from "../../types";

export const useScheduleForm = (
  schedule: MainSchedule = {
    id: randomId(),
    daysOfWeek: ["0", "1", "2", "3", "4", "5", "6"],
    hours: "0",
    minutes: "0",
    title: "",
    message: "",
  },
) => {
  const form = useForm({
    initialValues: schedule,
  });

  return {
    form,
  };
};
