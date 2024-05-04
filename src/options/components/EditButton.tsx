import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconPencil } from "@tabler/icons-react";
import { ScheduleModal } from ".";
import type { MainSchedule } from "../../types";
import { useScheduleForm } from "../hooks";

type Props = {
  schedule: MainSchedule;
  update: (values: MainSchedule) => void;
};

export const EditButton = ({ schedule, update }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { form } = useScheduleForm();

  return (
    <div>
      <ActionIcon
        variant="light"
        color="gray"
        radius="xl"
        onClick={() => {
          form.setValues(schedule);
          open();
        }}
      >
        <IconPencil />
      </ActionIcon>

      <ScheduleModal
        form={form}
        onSave={update}
        opened={opened}
        close={close}
      />
    </div>
  );
};
