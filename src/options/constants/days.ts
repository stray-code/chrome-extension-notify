export const days = [
  {
    value: "0",
    label: "日",
  },
  {
    value: "1",
    label: "月",
  },
  {
    value: "2",
    label: "火",
  },
  {
    value: "3",
    label: "水",
  },
  {
    value: "4",
    label: "木",
  },
  {
    value: "5",
    label: "金",
  },
  {
    value: "6",
    label: "土",
  },
] as const;

export const daysObject = Object.fromEntries(
  days.map((x) => [x.value, x.label]),
);
