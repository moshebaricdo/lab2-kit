import { Link } from "react-router-dom";
import { Button, Dropdown, Tooltip } from "@moshebari/cads-react";
import { Dialog } from "../components/ui/Dialog";
import { CadsLabProvider } from "../components/lab2/CadsLabProvider";
import { useState, useCallback, type ReactNode } from "react";
import {
  useSavedVariants,
  buildVariantAbsoluteUrl,
  buildVariantUrl,
} from "../hooks/useSavedVariants";
import type { SavedVariant } from "../hooks/useSavedVariants";
import { generatePromotedCode } from "../utils/promoteToCode";
import type { PromotedCode } from "../utils/promoteToCode";
import {
  aiChatLabLevelLinks,
  pythonLabLevelLinks,
  sketchLabLevelLinks,
  webLab2LevelLinks,
} from "./levelTypeLinks";
import { buildShareLinkDropdownItems } from "../lib/shareLinkActions";
import { getLevelTypeIconConfig } from "../lib/levelTypeIcon";
import styles from "./LevelsIndexPage.module.scss";

function levelTypeTooltipIconName(path: string) {
  const icon = getLevelTypeIconConfig(path);
  return icon.family === "solid" ? icon.name : undefined;
}

interface LevelPage {
  name: string;
  path: string;
}

interface LevelTypeGroup {
  label: string;
  pages: LevelPage[];
}

interface LevelTypeEntry {
  levelType: string;
  description: string;
  pages: LevelPage[];
  /** When set, the card lists every route in each group (not just group entry points). */
  groups?: LevelTypeGroup[];
}

interface LevelCategory {
  title: string;
  entries: LevelTypeEntry[];
}

const LEVEL_CATEGORIES: LevelCategory[] = [
  {
    title: "Lab environments",
    entries: [
      {
        levelType: "AI Chat Lab",
        description: "AI chat and model-card prototypes",
        pages: aiChatLabLevelLinks,
      },
      {
        levelType: "Web Lab 2",
        description: "HTML/CSS/JS IDE with live preview and Tutor",
        pages: webLab2LevelLinks,
      },
      {
        levelType: "Python Lab",
        description: "Python IDE with console output and guidance Tutor",
        pages: pythonLabLevelLinks,
      },
      {
        levelType: "Sketch Lab",
        description: "Whiteboard and diagramming canvas",
        pages: sketchLabLevelLinks,
      },
    ],
  },
];

const PATH_TO_LEVEL_TYPE: Record<string, string> = {
  "/levels/pythonlab": "Python Lab",
  "/levels/sketchlab": "Sketch Lab",
  "/levels/aichatlab": "AI Chat Lab",
  "/levels/weblab2": "Web Lab 2",
};

function levelTypeForPath(basePath: string): string {
  if (PATH_TO_LEVEL_TYPE[basePath]) return PATH_TO_LEVEL_TYPE[basePath];
  for (const [prefix, label] of Object.entries(PATH_TO_LEVEL_TYPE)) {
    if (basePath.startsWith(prefix)) return label;
  }
  return basePath;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="extraSmall"
      startIconName={copied ? "check" : "clipboard"}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function PromoteDialog({
  promoted,
  onClose,
}: {
  promoted: PromotedCode;
  onClose: () => void;
}) {
  return (
    <Dialog open title="Promote to code" onClose={onClose} size="l">
      <div className={styles.promoteSteps}>
        <section>
          <div className={styles.promoteStepHeader}>
            <p className={styles.promoteStepLabel}>
              1. Create <code>src/pages/{promoted.pageFilePath}</code>
            </p>
            <CopyButton text={promoted.pageCode} />
          </div>
          <pre className={styles.codeBlock}>{promoted.pageCode}</pre>
        </section>
        <section>
          <div className={styles.promoteStepHeader}>
            <p className={styles.promoteStepLabel}>
              2. Add route to <code>App.tsx</code>
            </p>
            <CopyButton text={promoted.routeEntry} />
          </div>
          <pre className={styles.codeBlock}>{promoted.routeEntry}</pre>
        </section>
        <section>
          <div className={styles.promoteStepHeader}>
            <p className={styles.promoteStepLabel}>
              3. Add link to <code>levelTypeLinks.ts</code>
            </p>
            <CopyButton text={promoted.linkEntry} />
          </div>
          <pre className={styles.codeBlock}>{promoted.linkEntry}</pre>
        </section>
      </div>
    </Dialog>
  );
}

function LevelTypeCard({ entry }: { entry: LevelTypeEntry }) {
  return (
    <div className={`${styles.card} ${styles.cardWithDescription}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{entry.levelType}</h3>
        <p className={styles.cardDescription}>{entry.description}</p>
      </div>
      {entry.groups?.length ? (
        <div className={styles.cardGroups}>
          {entry.groups.map((group) => (
            <div key={group.label} className={styles.cardGroup}>
              <p className={styles.cardGroupLabel}>{group.label}</p>
              <IndexBubbleRow pages={group.pages} />
            </div>
          ))}
        </div>
      ) : (
        <IndexBubbleRow pages={entry.pages} />
      )}
    </div>
  );
}

function IndexBubbleRow({
  pages,
  iconName,
}: {
  pages: LevelPage[];
  iconName?: (path: string) => string | undefined;
}) {
  return (
    <div className={styles.bubbleRow}>
      {pages.map((page, index) => (
        <Tooltip
          key={page.path}
          title={page.name}
          placement="top"
          iconName={iconName?.(page.path)}
        >
          <Link
            to={page.path}
            aria-label={`Open ${page.name}`}
            className={styles.bubble}
          >
            {index + 1}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
}

function formatTimestamp(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function CollapsibleSectionCard({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.variantsCard}>
      <div className={styles.variantsToggle}>
        <span className={styles.variantsToggleTitle}>{title}</span>
        <div className={styles.variantsToggleRight}>
          <button
            type="button"
            className={styles.variantsToggleMetaButton}
            aria-expanded={expanded}
            onClick={onToggle}
          >
            {expanded ? "Collapse section" : "Expand section"}
          </button>
          <Button
            variant="outlined"
            color="secondary"
            size="extraSmall"
            iconOnly
            startIconName={expanded ? "chevron-up" : "chevron-down"}
            aria-expanded={expanded}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            onClick={onToggle}
          />
        </div>
      </div>
      {expanded ? <div className={styles.sectionBody}>{children}</div> : null}
    </section>
  );
}

function SavedVariantsSection() {
  const { variants, deleteVariant } = useSavedVariants();
  const [promoteTarget, setPromoteTarget] = useState<PromotedCode | null>(
    null,
  );
  const [expanded, setExpanded] = useState(true);

  const handlePromote = useCallback((v: SavedVariant) => {
    const result = generatePromotedCode(v);
    if (result) setPromoteTarget(result);
  }, []);

  const copyVariantShareLink = useCallback((
    variant: SavedVariant,
    shareMode: "locked-level" | "flow",
  ) => {
    navigator.clipboard.writeText(
      buildVariantAbsoluteUrl(variant.basePath, variant.overrides, {
        searchParams: variant.searchParams,
        shareMode,
      }),
    );
  }, []);

  if (variants.length === 0) return null;

  return (
    <div className={styles.variantsSection}>
      {promoteTarget && (
        <PromoteDialog
          promoted={promoteTarget}
          onClose={() => setPromoteTarget(null)}
        />
      )}
      <CollapsibleSectionCard
        title="Variants"
        expanded={expanded}
        onToggle={() => setExpanded((current) => !current)}
      >
        <div className={styles.variantsList}>
          {variants.map((v) => {
            const shareItems = buildShareLinkDropdownItems({
              onLockedLevel: () => copyVariantShareLink(v, "locked-level"),
              onFlow: () => copyVariantShareLink(v, "flow"),
            });
            return (
              <div key={v.id} className={styles.variantRow}>
                <div className={styles.variantInfo}>
                  <Link
                    to={buildVariantUrl(v.basePath, v.overrides, {
                      searchParams: v.searchParams,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.variantNameLink}
                  >
                    {v.name}
                  </Link>
                  <div className={styles.variantMeta}>
                    <span className={styles.typePill}>
                      {levelTypeForPath(v.basePath)}
                    </span>
                    <span className={styles.variantDate}>
                      {formatTimestamp(v.savedAt)}
                    </span>
                  </div>
                </div>
                <div className={styles.variantActions}>
                  <Tooltip title="Open in new tab" placement="top">
                    <Link
                      to={buildVariantUrl(v.basePath, v.overrides, {
                        searchParams: v.searchParams,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="text"
                        color="tertiary"
                        size="extraSmall"
                        iconOnly
                        startIconName="arrow-up-right-from-square"
                        tabIndex={-1}
                      />
                    </Link>
                  </Tooltip>
                  <Dropdown
                    role="action"
                    size="extraSmall"
                    buttonVariant="text"
                    buttonColor="tertiary"
                    iconOnly
                    startIconName="share-nodes"
                    aria-label={`Share ${v.name}`}
                    menuPlacement="bottomRight"
                    menuWidth={208}
                    options={shareItems.map((item) => ({
                      value: item.id,
                      label: item.label,
                      iconName: item.iconName,
                    }))}
                    onAction={(actionValue) => {
                      shareItems.find((item) => item.id === actionValue)?.onSelect();
                    }}
                  />
                  <Tooltip title="Promote to code" placement="top">
                    <Button
                      variant="text"
                      color="tertiary"
                      size="extraSmall"
                      iconOnly
                      startIconName="code"
                      onClick={() => handlePromote(v)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <Button
                      variant="text"
                      color="tertiary"
                      size="extraSmall"
                      iconOnly
                      startIconName="trash"
                      onClick={() => deleteVariant(v.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleSectionCard>
    </div>
  );
}

export function LevelsIndexPage() {
  const [experimentsExpanded, setExperimentsExpanded] = useState(true);
  const [levelTypesExpanded, setLevelTypesExpanded] = useState(true);

  return (
    <CadsLabProvider>
      <main className={styles.page}>
        <div className={styles.container}>
        <h1 className={styles.pageTitle}>Lab2 Prototype Kit</h1>
        <p className={styles.pageSubtitle}>
          Canonical Chat, Web, Python, and Sketch labs in a shared Lab2 frame.
          Iterate with an experiment route — do not edit a canonical page for a one-off.
        </p>

        <SavedVariantsSection />

        <div className={styles.categories}>
          <CollapsibleSectionCard
            title="Level Types"
            expanded={levelTypesExpanded}
            onToggle={() => setLevelTypesExpanded((current) => !current)}
          >
            {LEVEL_CATEGORIES.map((category) => (
              <section key={category.title} className={styles.levelTypeGroup}>
                <h2 className={styles.sectionHeading}>{category.title}</h2>
                <div className={styles.entryGrid}>
                  {category.entries.map((entry) => (
                    <LevelTypeCard key={entry.levelType} entry={entry} />
                  ))}
                </div>
              </section>
            ))}
          </CollapsibleSectionCard>

          <CollapsibleSectionCard
            title="Experiments"
            expanded={experimentsExpanded}
            onToggle={() => setExperimentsExpanded((current) => !current)}
          >
            <div className={styles.entryGrid}>
              <div className={`${styles.card} ${styles.cardWithDescription}`}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Your experiments land here</h3>
                  <p className={styles.cardDescription}>
                    Copy a canonical lab page, register{" "}
                    <code>/levels/&lt;lab&gt;-&lt;slug&gt;</code> in{" "}
                    <code>App.tsx</code>, and list it in this section. Leave the
                    Level Types routes as the stable product surface.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSectionCard>

        </div>
      </div>
      </main>
    </CadsLabProvider>
  );
}
