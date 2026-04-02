import fs from "fs/promises";
import { Assigment, Members } from "./types";

const PATH_work = "./public/assigment.json";
const PATH_members = "./public/members.json";

export const readList = async () => {
  const jsonWork = await fs.readFile(PATH_work, "utf-8");
  const objWork = JSON.parse(jsonWork);
  // console.log(objMovies)
  return objWork;
};

export const addList = async (newWork: Assigment) => {
  const Workis = await readList();
  Workis.push(newWork);
  newWork.id = crypto.randomUUID();
  await fs.writeFile(PATH_work, JSON.stringify(Workis, null, 2));
};

export const moveList = async (id: string, status: string) => {
  const jsonWork = await fs.readFile(PATH_work, "utf-8");
  const objWork = JSON.parse(jsonWork);
  for (let o of objWork) {
    if (o.id == id) {
      o.status = status;
      console.log(JSON.stringify(o) + "Ändrat status");
    }
  }
  await fs.writeFile(PATH_work, JSON.stringify(objWork, null, 2));
};

export const readMembers = async () => {
  const jsonWork = await fs.readFile(PATH_members, "utf-8");
  const objWork = JSON.parse(jsonWork);
  return objWork;
};

export const addMembers = async (newMember: Members) => {
  const Members = await readMembers();
  Members.push(newMember);
  newMember.id = crypto.randomUUID();
  await fs.writeFile(PATH_members, JSON.stringify(Members, null, 2));
};

export const removeWork = async (id: string) => {
  const jsonWork = await fs.readFile(PATH_work, "utf-8");
 let objWork = JSON.parse(jsonWork);
  objWork = objWork.filter((item:Assigment ) => item.id !== id)
  await fs.writeFile(PATH_work, JSON.stringify(objWork, null, 2));
}
