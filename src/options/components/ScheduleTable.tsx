import { Flex, Table, Text } from "@mantine/core";

import { DestroyButton, EditButton } from ".";
import type { MainSchedule } from "../../types";
import { days, daysObject } from "../constants";

type Props = {
  mainScheduleList: MainSchedule[];
  update: (newMainScheduleList: MainSchedule[]) => void;
};

export const ScheduleTable = ({ mainScheduleList, update }: Props) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>タイトル</Table.Th>
          <Table.Th>曜日</Table.Th>
          <Table.Th>時間</Table.Th>
          <Table.Th w={0}></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {mainScheduleList.map((storageSchedule, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Text lineClamp={1} fz="sm">
                {storageSchedule.title}
              </Text>
            </Table.Td>
            <Table.Td style={{ whiteSpace: "nowrap" }}>
              {storageSchedule.daysOfWeek.length === days.length
                ? "毎日"
                : storageSchedule.daysOfWeek
                    .map((day) => daysObject[day])
                    .join("・")}
            </Table.Td>
            <Table.Td style={{ whiteSpace: "nowrap" }}>
              {storageSchedule.hours}時{storageSchedule.minutes}分
            </Table.Td>
            <Table.Td>
              <Flex gap="md">
                <EditButton
                  schedule={storageSchedule}
                  update={(values) => {
                    const newMainScheduleList = mainScheduleList.map(
                      (schedule, scheduleIndex) => {
                        if (scheduleIndex === index) {
                          return values;
                        }

                        return schedule;
                      },
                    );

                    update(newMainScheduleList);
                  }}
                />
                <DestroyButton
                  destroy={() => {
                    const newMainScheduleList = mainScheduleList.filter(
                      (_, scheduleIndex) => scheduleIndex !== index,
                    );

                    update(newMainScheduleList);
                  }}
                />
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
