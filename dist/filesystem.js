"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWork = exports.addMembers = exports.readMembers = exports.moveList = exports.addList = exports.readList = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const PATH_work = "./public/assigment.json";
const PATH_members = "./public/members.json";
const readList = async () => {
    const jsonWork = await promises_1.default.readFile(PATH_work, "utf-8");
    const objWork = JSON.parse(jsonWork);
    // console.log(objMovies)
    return objWork;
};
exports.readList = readList;
const addList = async (newWork) => {
    const Workis = await (0, exports.readList)();
    Workis.push(newWork);
    newWork.id = crypto.randomUUID();
    await promises_1.default.writeFile(PATH_work, JSON.stringify(Workis, null, 2));
};
exports.addList = addList;
const moveList = async (id, status) => {
    const jsonWork = await promises_1.default.readFile(PATH_work, "utf-8");
    const objWork = JSON.parse(jsonWork);
    for (let o of objWork) {
        if (o.id == id) {
            o.status = status;
            console.log(JSON.stringify(o) + "Ändrat status");
        }
    }
    await promises_1.default.writeFile(PATH_work, JSON.stringify(objWork, null, 2));
};
exports.moveList = moveList;
const readMembers = async () => {
    const jsonWork = await promises_1.default.readFile(PATH_members, "utf-8");
    const objWork = JSON.parse(jsonWork);
    return objWork;
};
exports.readMembers = readMembers;
const addMembers = async (newMember) => {
    const Members = await (0, exports.readMembers)();
    Members.push(newMember);
    newMember.id = crypto.randomUUID();
    await promises_1.default.writeFile(PATH_members, JSON.stringify(Members, null, 2));
};
exports.addMembers = addMembers;
const removeWork = async (id) => {
    const jsonWork = await promises_1.default.readFile(PATH_work, "utf-8");
    let objWork = JSON.parse(jsonWork);
    objWork = objWork.filter((item) => item.id !== id);
    await promises_1.default.writeFile(PATH_work, JSON.stringify(objWork, null, 2));
};
exports.removeWork = removeWork;
