export const categories = [
  { name: "Others", value: "OTHERS" },
  { name: "Office", value: "OFFICE" },
  { name: "Home", value: "HOME" },
] as const;

type Category = (typeof categories)[number]["value"];

export type TaskData = {
  message: string;
  category: Category;
  postedBy: any;
};
