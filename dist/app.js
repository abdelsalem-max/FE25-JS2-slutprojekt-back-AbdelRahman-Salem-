"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const filesystem_1 = require("./filesystem");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get("/assignments", async (req, res) => {
    const AssignmentList = await (0, filesystem_1.readList)();
    res.json(AssignmentList);
});
exports.app.post("/assignment", async (req, res) => {
    await (0, filesystem_1.addList)(req.body);
    res.json({ message: "assignment added" });
});
exports.app.post("/assignment/move", async (req, res) => {
    const AssignmentList = (await (0, filesystem_1.readList)()) + "id:" + JSON.stringify(req.body.status) + " assignment moved";
    //await addList (req.body)
    const newStatus = req.body.status;
    const assignmentId = req.body.id;
    await (0, filesystem_1.moveList)(assignmentId, newStatus);
    // kommmer byta status för det assingment med et id
    res.json(AssignmentList + ":" + newStatus + ":" + assignmentId);
});
exports.app.get("/members", async (req, res) => {
    const memberList = await (0, filesystem_1.readMembers)();
    //res.json(memberList+req.body);
    res.json(memberList);
});
exports.app.post("/member", async (req, res) => {
    await (0, filesystem_1.addMembers)(req.body);
    res.json({ message: "member added" });
});
exports.app.delete("/assignment/delete", async (req, res) => {
    const AssignmentList = (await (0, filesystem_1.readList)()) + "id:" + JSON.stringify(req.body.status) + " assignment moved";
    //await addList (req.body)
    const assignmentId = req.body.id;
    await (0, filesystem_1.removeWork)(assignmentId);
    res.json(AssignmentList + "Removed" + assignmentId);
});
