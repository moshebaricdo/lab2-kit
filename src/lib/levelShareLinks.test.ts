import { describe, expect, it } from "vitest";
import {
  findLevelLinkIndex,
  includesLevelPath,
  isProgressionLevelLinks,
  isProgressionLevelPath,
  mapLevelLinksWithShareMode,
  resolveShareAwareNavigationPath,
  withLevelShareModePath,
} from "./levelShareLinks";
import { webLab2LevelLinks } from "../pages/levelTypeLinks";

describe("isProgressionLevelPath", () => {
  it("matches progression routes", () => {
    expect(isProgressionLevelPath("/levels/progression-weblab")).toBe(true);
  });

  it("ignores canonical lab routes", () => {
    expect(isProgressionLevelPath("/levels/weblab2-level")).toBe(false);
    expect(isProgressionLevelPath("/levels/pythonlab")).toBe(false);
  });
});

describe("isProgressionLevelLinks", () => {
  it("returns false for canonical level link sets", () => {
    expect(isProgressionLevelLinks(webLab2LevelLinks)).toBe(false);
  });
});

describe("withLevelShareModePath", () => {
  it("adds locked share mode to a path", () => {
    expect(withLevelShareModePath("/levels/weblab2-level", "locked")).toBe(
      "/levels/weblab2-level?share=locked",
    );
  });

  it("preserves existing search params while setting share mode", () => {
    expect(
      withLevelShareModePath("/levels/weblab2-level?foo=bar", "locked"),
    ).toBe("/levels/weblab2-level?foo=bar&share=locked");
  });
});

describe("mapLevelLinksWithShareMode", () => {
  it("maps every link", () => {
    const [first] = mapLevelLinksWithShareMode(webLab2LevelLinks, "locked");
    expect(first.path).toBe("/levels/weblab2-level?share=locked");
  });
});

describe("findLevelLinkIndex", () => {
  it("matches level links that include share search params", () => {
    const links = mapLevelLinksWithShareMode(webLab2LevelLinks, "locked");
    expect(findLevelLinkIndex(links, "/levels/weblab2-demo-project")).toBe(1);
  });
});

describe("includesLevelPath", () => {
  it("matches completed paths regardless of search params", () => {
    expect(
      includesLevelPath(
        ["/levels/weblab2-level?share=locked"],
        "/levels/weblab2-level",
      ),
    ).toBe(true);
  });
});

describe("resolveShareAwareNavigationPath", () => {
  it("leaves canonical lab routes unchanged in locked share mode", () => {
    expect(resolveShareAwareNavigationPath("/levels/weblab2-level", "locked")).toBe(
      "/levels/weblab2-level",
    );
  });
});
