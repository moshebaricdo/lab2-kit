import type { ChatMessage } from "../../types/chat";
import type { SketchLegacyEdge, SketchNode } from "../../types/sketchLab";

/** Default Sketch Lab canvas starts empty. */
export const sketchLabStarterNodes: SketchNode[] = [];

/** @deprecated Legacy starter edges — migrated to standalone line nodes. */
export const sketchLabStarterEdges: SketchLegacyEdge[] = [];

export const sketchLabInstructionsMarkdown = [
  "# Sketch your plan",
  "Use the whiteboard to map out your idea before you build it.",
  "## Do This",
  "1. Add a shape from the toolbar on the left of the canvas.",
  "2. Double-click a shape to label it.",
  "3. Add a line, then drag from a handle to connect it to another shape.",
  "4. Select any element to style it in the panel on the right.",
].join("\n\n");

export const sketchLabInitialChatMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi! I can help you plan your sketch. Tell me what you're trying to diagram and I'll suggest shapes and connections.",
  },
];
