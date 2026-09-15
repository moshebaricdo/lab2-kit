import type { FaBrandIconName } from "../icons/faBrandsCodepoints";
import type { FaIconName } from "../icons/faProRegularCodepoints";
import { getPathnameFromLevelPath } from "./levelShareLinks";

export type LevelTypeIconConfig =
  | { family: "solid"; name: FaIconName }
  | { family: "brands"; name: FaBrandIconName };

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}-`) || pathname.startsWith(prefix);
}

export function getLevelTypeIconConfig(path: string): LevelTypeIconConfig {
  const pathname = getPathnameFromLevelPath(path);

  if (matchesPrefix(pathname, "/levels/aichatlab")) {
    return { family: "solid", name: "messages" };
  }

  if (matchesPrefix(pathname, "/levels/pythonlab")) {
    return { family: "brands", name: "python" };
  }

  if (matchesPrefix(pathname, "/levels/sketchlab")) {
    return { family: "solid", name: "diagram-project" };
  }

  if (pathname.startsWith("/levels/weblab2")) {
    return { family: "solid", name: "display-code" };
  }

  return { family: "solid", name: "flask" };
}
