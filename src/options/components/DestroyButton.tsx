import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type Props = {
  destroy: () => void;
};

export const DestroyButton = ({ destroy }: Props) => {
  return (
    <ActionIcon
      variant="light"
      color="gray"
      radius="xl"
      onClick={() => {
        const result = confirm("削除してもよろしいですか？");

        if (!result) {
          return;
        }

        destroy();
      }}
    >
      <IconTrash />
    </ActionIcon>
  );
};
