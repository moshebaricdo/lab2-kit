import type { LevelProgressLink } from "../components/ui/header/LevelProgressBubbles";

/** Canonical templates: [0] in-curriculum, [1] standalone. */
export const webLab2LevelLinks: LevelProgressLink[] = [
  {
    name: "Web Lab 2 Level",
    path: "/levels/weblab2-level",
  },
  {
    name: "Standalone Project",
    path: "/levels/weblab2-demo-project-blank",
  },
];

export const pythonLabLevelLinks: LevelProgressLink[] = [
  { name: "Python Lab Level", path: "/levels/pythonlab" },
  { name: "Standalone Project", path: "/levels/pythonlab-blank" },
];

export const sketchLabLevelLinks: LevelProgressLink[] = [
  { name: "Sketch Lab Level", path: "/levels/sketchlab" },
  { name: "Standalone Project", path: "/levels/sketchlab-blank" },
];

/** Chat Lab has no standalone context — two in-curriculum surfaces. */
export const aiChatLabLevelLinks: LevelProgressLink[] = [
  { name: "Chat Only Level", path: "/levels/aichatlab" },
  { name: "Configure Chatbot Level", path: "/levels/aichatlab-model-card" },
];
