import express from "express";
import cors from "cors";
import { addList, addMembers, moveList, readList, readMembers, removeWork } from "./filesystem";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/assignments", async (req, res) => {
  const AssignmentList = await readList();
  res.json(AssignmentList);
});

app.post("/assignment", async (req, res) => {
  await addList(req.body);
  res.json({ message: "assignment added" });
});

app.post("/assignment/move", async (req, res) => {
  const AssignmentList = (await readList()) + "id:" + JSON.stringify(req.body.status)+ " assignment moved";
  //await addList (req.body)
  const newStatus= req.body.status as string;
  const assignmentId= req.body.id as string;
  await moveList( assignmentId, newStatus)
  
// kommmer byta status för det assingment med et id

  res.json(AssignmentList +":"+newStatus+":"+assignmentId);
});

app.get("/members", async (req, res) => {
  const memberList = await readMembers();
  //res.json(memberList+req.body);
  res.json(memberList);
});

app.post("/member", async (req, res) => {
  await addMembers(req.body);
  res.json({ message: "member added" });
});

app.delete("/assignment/delete", async (req, res) => {
  const AssignmentList = (await readList()) + "id:" + JSON.stringify(req.body.status)+ " assignment moved";
  //await addList (req.body)
  const assignmentId= req.body.id as string;
  await removeWork( assignmentId)
  res.json(AssignmentList +"Removed"+assignmentId);
})
