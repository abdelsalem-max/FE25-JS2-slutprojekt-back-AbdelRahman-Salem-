export type Assigment = {
  id: string;
  title: string;
  description: string;
  category: "Planet" | "Star" | "Moon";
  status: "new" | "doing" | "done";
  assignedto: undefined | string;
  timestamp: string;
};

export type Members = {
  id: string;
  name: string;
  category: "rocket" | "boat" | "walker";
};
