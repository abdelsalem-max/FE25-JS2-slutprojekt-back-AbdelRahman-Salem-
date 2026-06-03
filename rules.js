"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewAssignment = validateNewAssignment;
exports.getMemberAssignmentCategory = getMemberAssignmentCategory;
exports.canAssignMemberToAssignment = canAssignMemberToAssignment;
const memberCategoryToAssignmentCategory = {
    rocket: "Planet",
    boat: "Star",
    walker: "Moon",
};
function validateNewAssignment(assignment) {
    if (!assignment.title?.trim() || !assignment.description?.trim()) {
        return { valid: false, message: "Title and description are required" };
    }
    return { valid: true };
}
function getMemberAssignmentCategory(member) {
    return memberCategoryToAssignmentCategory[member.category];
}
function canAssignMemberToAssignment(assignment, member) {
    if (assignment.status !== "new") {
        return { valid: false, message: "Members can only be assigned to new assignments" };
    }
    if (assignment.category !== getMemberAssignmentCategory(member)) {
        return { valid: false, message: "Member category must match assignment category" };
    }
    return { valid: true };
}
