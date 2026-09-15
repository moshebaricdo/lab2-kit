import type { SavedVariant } from "../hooks/useSavedVariants";

interface WorkspaceMapping {
  component: string;
  importPath: string;
  linksVar: string;
  pageDirectory: string;
}

const PATH_TO_WORKSPACE: Record<string, WorkspaceMapping> = {
  "/levels/weblab2": {
    component: "WebLab2LevelPage",
    importPath: "./WebLab2LevelPage",
    linksVar: "webLab2LevelLinks",
    pageDirectory: "weblab2",
  },
  "/levels/pythonlab": {
    component: "PythonLabLevelPage",
    importPath: "../pythonlab/PythonLabLevelPage",
    linksVar: "pythonLabLevelLinks",
    pageDirectory: "pythonlab",
  },
  "/levels/sketchlab": {
    component: "SketchLabLevelPage",
    importPath: "../sketchlab/SketchLabLevelPage",
    linksVar: "sketchLabLevelLinks",
    pageDirectory: "sketchlab",
  },
  "/levels/aichatlab": {
    component: "AiChatLabLevelPage",
    importPath: "../aichatlab/AiChatLabLevelPage",
    linksVar: "aiChatLabLevelLinks",
    pageDirectory: "aichatlab",
  },
};

function findMapping(basePath: string): WorkspaceMapping | null {
  if (PATH_TO_WORKSPACE[basePath]) return PATH_TO_WORKSPACE[basePath];
  for (const [prefix, mapping] of Object.entries(PATH_TO_WORKSPACE)) {
    if (basePath.startsWith(prefix)) return mapping;
  }
  return null;
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toPascalCase(slug: string) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function stringifyOverrides(overrides: Record<string, unknown>, indent = 2): string {
  return JSON.stringify(overrides, null, indent);
}

export interface PromotedCode {
  pageName: string;
  pageFileName: string;
  pageFilePath: string;
  pageCode: string;
  routeEntry: string;
  linkEntry: string;
  routePath: string;
}

export function generatePromotedCode(variant: SavedVariant): PromotedCode | null {
  const mapping = findMapping(variant.basePath);
  if (!mapping) return null;

  const slug = toSlug(variant.name);
  const routePath = `/levels/${slug}`;
  const pageName = `${toPascalCase(slug)}LevelPage`;
  const pageFileName = `${pageName}.tsx`;
  const pageFilePath = `${mapping.pageDirectory}/${pageFileName}`;

  const overridesStr = stringifyOverrides(variant.overrides, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n");

  const pageCode = `import { ${mapping.component} } from "${mapping.importPath}";
import { ${mapping.linksVar} } from "../levelTypeLinks";

const overrides = ${overridesStr};

export function ${pageName}() {
  return (
    <${mapping.component}
      {...(overrides as object)}
      levelLinks={${mapping.linksVar}}
      currentLevelPath="${routePath}"
    />
  );
}
`;

  const routeEntry = `<Route path="${routePath}" element={<${pageName} />} />`;
  const linkEntry = `{ name: "${variant.name}", path: "${routePath}" },`;

  return {
    pageName,
    pageFileName,
    pageFilePath,
    pageCode,
    routeEntry,
    linkEntry,
    routePath,
  };
}
