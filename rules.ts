import { Assigment, Members } from "./types";

type ValidationResult = {
  valid: boolean;
  message?: string;
};

const memberCategoryToAssignmentCategory: Record<Members["category"], Assigment["category"]> = {
  rocket: "Planet",
  boat: "Star",
  walker: "Moon",
};

export function validateNewAssignment(assignment: Partial<Assigment>): ValidationResult {
  if (!assignment.title?.trim() || !assignment.description?.trim()) {
    return { valid: false, message: "Title and description are required" };
  }

  return { valid: true };
}

export function getMemberAssignmentCategory(member: Members): Assigment["category"] {
  return memberCategoryToAssignmentCategory[member.category];
}

export function canAssignMemberToAssignment(
  assignment: Assigment,
  member: Members,
): ValidationResult {
  if (assignment.status !== "new") {
    return { valid: false, message: "Members can only be assigned to new assignments" };
  }

  if (assignment.category !== getMemberAssignmentCategory(member)) {
    return { valid: false, message: "Member category must match assignment category" };
  }

  return { valid: true };
}
