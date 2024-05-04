import { Container, Paper, Stack, Text, Title } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import { AddButton, ScheduleTable } from ".";
import type { MainSchedule, Message } from "../../types";
import { getLocalStorage, setLocalStorage } from "../../utils";

export const App = () => {
  const [mainScheduleList, setMainScheduleList] = useState<MainSchedule[]>([]);

  const getScheduleList = useCallback(async () => {
    const mainScheduleList = await getLocalStorage("mainScheduleList");

    if (!mainScheduleList) {
      return;
    }

    setMainScheduleList(mainScheduleList);
  }, []);

  const update = async (values: MainSchedule[]) => {
    setLocalStorage("mainScheduleList", values);

    chrome.runtime.sendMessage<Message>({ type: "updateAlarm" });

    getScheduleList();
  };

  useEffect(() => {
    getScheduleList();
  }, [getScheduleList]);

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
