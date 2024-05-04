import { Button } from "@mantine/core";
import { randomId, useDisclosure } from "@mantine/hooks";

import { ScheduleModal } from ".";
import type { MainSchedule } from "../../types";
import { useScheduleForm } from "../hooks";

type Props = {
  add: (values: MainSchedule) => void;
};

export const AddButton = ({ add }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { form } = useScheduleForm();

  return (
    <div>
      <Button
        variant="outline"
        radius="xl"
        onClick={() => {
          form.setFieldValue("id", randomId());
          open();
        }}
      >
        通知を追加
      </Button>

      <ScheduleModal form={form} onSave={add} opened={opened} close={close} />
    </div>
  );
};
