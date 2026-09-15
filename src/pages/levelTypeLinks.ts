import type { LevelProgressLink } from "../components/ui/header/LevelProgressBubbles";

export const webLab2LevelLinks: LevelProgressLink[] = [
  {
    name: "Web Lab 2 Level",
    path: "/levels/weblab2-level",
  },
  {
    name: "Standalone Project (Demo)",
    path: "/levels/weblab2-demo-project",
  },
  {
    name: "Standalone Project (Blank)",
    path: "/levels/weblab2-demo-project-blank",
  },
];

export const pythonLabLevelLinks: LevelProgressLink[] = [
  { name: "Python Lab Level", path: "/levels/pythonlab" },
  { name: "Standalone Project (Blank)", path: "/levels/pythonlab-blank" },
];

export const sketchLabLevelLinks: LevelProgressLink[] = [
  { name: "Sketch Lab Level", path: "/levels/sketchlab" },
  { name: "Standalone Project (Blank)", path: "/levels/sketchlab-blank" },
];

export const aiChatLabLevelLinks: LevelProgressLink[] = [
  { name: "Chat Only Level", path: "/levels/aichatlab" },
  { name: "Setup Only Level", path: "/levels/aichatlab-setup" },
  { name: "Full Model Config Level", path: "/levels/aichatlab-model-card" },
];
