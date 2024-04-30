import { useEffect, useState } from "react";
import { Container, Stack, Paper, Title, Text } from "@mantine/core";

import { MainSchedule } from "../../types";
import { AddButton, ScheduleTable } from ".";
import { getLocalStorage, setLocalStorage } from "../../utils";

export const App = () => {
  const [mainScheduleList, setMainScheduleList] = useState<MainSchedule[]>([]);

  const getScheduleList = async () => {
    const mainScheduleList = await getLocalStorage("mainScheduleList");

    if (!mainScheduleList) {
      return;
    }

    setMainScheduleList(mainScheduleList);
  };

  const update = async (values: MainSchedule[]) => {
    setLocalStorage("mainScheduleList", values);

    chrome.runtime.sendMessage({ type: "UPDATE_ALARM" });

    getScheduleList();
  };

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title fz="xl">通知の設定</Title>
        <Text fz="sm" c="gray.7">
          ご利用の際はパソコンのChromeの通知許可をONにしてください。
          <br />
          同じ曜日・同じ時間は１つしか通知されないためご注意ください。
        </Text>
        {mainScheduleList.length > 0 && (
          <Paper shadow="md" withBorder>
            <ScheduleTable
              mainScheduleList={mainScheduleList}
              update={update}
            />
          </Paper>
        )}
        <AddButton
          add={(values) => {
            const newMainScheduleList = [...mainScheduleList, values];

            update(newMainScheduleList);
          }}
        />
      </Stack>
    </Container>
  );
};
