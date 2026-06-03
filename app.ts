import express from "express";
import cors from "cors";
import { addList, addMembers, assignMemberToWork, moveList, readList, readMembers, removeWork } from "./filesystem";
import { canAssignMemberToAssignment, validateNewAssignment } from "./rules";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/assignments", async (req, res) => {
  const AssignmentList = await readList();
  res.json(AssignmentList);
});

app.post("/assignment", async (req, res) => {
  const validation = validateNewAssignment(req.body);

  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  await addList(req.body);
  res.json({ message: "assignment added" });
});

app.post("/assignment/assign", async (req, res) => {
  const assignmentId = req.body.id as string;
  const memberName = req.body.memberName as string;
  const assignments = await readList();
  const members = await readMembers();
  const work = assignments.find((item) => item.id === assignmentId);
  const member = members.find((item) => item.name === memberName);

  if (!work || !member) {
    return res.status(404).json({ message: "Assignment or member not found" });
  }

  const validation = canAssignMemberToAssignment(work, member);

  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  await assignMemberToWork(assignmentId, memberName);
  res.json({ message: "member assigned" });
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
