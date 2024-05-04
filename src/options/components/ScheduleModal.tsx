import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Modal,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";

import type { MainSchedule } from "../../types";
import { days, hours, minutes } from "../constants";
import type { useScheduleForm } from "../hooks";

type Props = {
  form: ReturnType<typeof useScheduleForm>["form"];
  onSave: (values: MainSchedule) => void;
  opened: boolean;
  close: VoidFunction;
};

export const ScheduleModal = ({ form, onSave, opened, close }: Props) => {
  return (
    <Modal opened={opened} onClose={close} title="通知の設定" centered>
      <form
        onSubmit={form.onSubmit((values) => {
          onSave(values);
          close();
          form.reset();
        })}
      >
        <Stack>
          <Checkbox.Group label="曜日" {...form.getInputProps("daysOfWeek")}>
            <Group>
              {days.map((day) => (
                <Checkbox
                  key={day.value}
                  value={day.value}
                  label={day.label}
                  styles={(theme) => ({
                    label: {
                      paddingInlineStart: theme.spacing.xs,
                    },
                  })}
                />
              ))}
            </Group>
          </Checkbox.Group>
          <Box>
            <Text>時間</Text>
            <Flex gap="md">
              <NativeSelect
                {...form.getInputProps("hours")}
                data={hours}
                rightSection="時"
              />
              <NativeSelect
                {...form.getInputProps("minutes")}
                data={minutes}
                rightSection="分"
              />
            </Flex>
          </Box>
          <TextInput {...form.getInputProps("title")} label="タイトル" />
          <Textarea {...form.getInputProps("message")} label="メッセージ" />
          <Flex justify="flex-end">
            <Button type="submit" radius="xl">
              保存
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
};
