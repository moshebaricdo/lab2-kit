import type { LevelProgressLink } from "../components/ui/header/LevelProgressBubbles";
import {
  aiChatLabLevelLinks,
  pythonLabLevelLinks,
  sketchLabLevelLinks,
  webLab2LevelLinks,
} from "../pages/levelTypeLinks";

type LevelPageGroup = {
  levelType: string;
  pages: LevelProgressLink[];
};

const LEVEL_PAGE_GROUPS: LevelPageGroup[] = [
  { levelType: "AI Chat Lab", pages: aiChatLabLevelLinks },
  { levelType: "Web Lab 2", pages: webLab2LevelLinks },
  { levelType: "Python Lab", pages: pythonLabLevelLinks },
  { levelType: "Sketch Lab", pages: sketchLabLevelLinks },
];

export const DEFAULT_PAGE_TITLE = "Lab2 Prototype Kit";
export const INDEX_PAGE_TITLE = `${DEFAULT_PAGE_TITLE} | Level index`;

export function formatPageTitle(levelType: string, levelName: string): string {
  return `${levelType} | ${levelName}`;
}

const PAGE_TITLE_BY_PATH = buildPageTitleMap();

function buildPageTitleMap(): Map<string, string> {
  const map = new Map<string, string>();

  for (const { levelType, pages } of LEVEL_PAGE_GROUPS) {
    for (const page of pages) {
      map.set(page.path, formatPageTitle(levelType, page.name));
    }
  }

  map.set("/design-system/cads", "CADS | Component catalog");
  return map;
}

export function getPageTitleForPath(pathname: string): string {
  if (pathname === "/" || pathname === "/levels") {
    return INDEX_PAGE_TITLE;
  }

  return PAGE_TITLE_BY_PATH.get(pathname) ?? DEFAULT_PAGE_TITLE;
}
