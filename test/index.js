import TreeEvent from "../src/event.js";
import TreeNode from "../src/target.js";

let root_node = new TreeNode({ name: "root" });
let parent_0 = new TreeNode({ name: "parent" });
let child_0_1 = new TreeNode({ name: "child" });

root_node.insertChild(parent_0);
parent_0.insertChild(child_0_1);

root_node.addEventListener("ping", (e) => {
  console.log("root", e.currentTarget.name, e.target.name);
});

parent_0.addEventListener("ping", (e) => {
  console.log("parent", e.currentTarget.name, e.target.name);
});

child_0_1.addEventListener("ping", (e) => {
  console.log("child", e.target.name, e.currentTarget.name);
});

child_0_1.dispatchEvent(new TreeEvent("ping", { bubbles: true }));
