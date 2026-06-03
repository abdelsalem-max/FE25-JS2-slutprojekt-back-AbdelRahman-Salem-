import assert from "assert";
import {
  canAssignMemberToAssignment,
  getMemberAssignmentCategory,
  validateNewAssignment,
} from "../src/rules";
import { Assigment, Members } from "../src/types";

const planetAssignment: Assigment = {
  id: "assignment-1",
  title: "Repair satellite",
  description: "Fix the broken antenna",
  category: "Planet",
  status: "new",
  assignedto: undefined,
  timestamp: Date.now().toString(),
};

const rocketMember: Members = {
  id: "member-1",
  name: "Alex",
  category: "rocket",
};

const boatMember: Members = {
  id: "member-2",
  name: "Sam",
  category: "boat",
};

assert.deepEqual(validateNewAssignment({ title: "", description: "Test", category: "Planet" }), {
  valid: false,
  message: "Title and description are required",
});

assert.deepEqual(validateNewAssignment({ title: "Test", description: "   ", category: "Planet" }), {
  valid: false,
  message: "Title and description are required",
});

assert.deepEqual(validateNewAssignment({ title: "Test", description: "Work", category: "Planet" }), {
  valid: true,
});

assert.equal(getMemberAssignmentCategory(rocketMember), "Planet");
assert.equal(getMemberAssignmentCategory(boatMember), "Star");

assert.deepEqual(canAssignMemberToAssignment(planetAssignment, rocketMember), {
  valid: true,
});

assert.deepEqual(canAssignMemberToAssignment(planetAssignment, boatMember), {
  valid: false,
  message: "Member category must match assignment category",
});

assert.deepEqual(canAssignMemberToAssignment({ ...planetAssignment, status: "doing" }, rocketMember), {
  valid: false,
  message: "Members can only be assigned to new assignments",
});

console.log("Alla regeltester passerade");
