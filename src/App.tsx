import { lazy, Suspense, type ComponentType } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { usePageTitle } from "./hooks/usePageTitle";

function lazyPage<TModule, TName extends keyof TModule>(
  loader: () => Promise<TModule>,
  exportName: TName,
) {
  return lazy(async () => ({
    default: (await loader())[exportName] as unknown as ComponentType,
  }));
}

const LevelsIndexPage = lazyPage(
  () => import("./pages/LevelsIndexPage"),
  "LevelsIndexPage",
);
const AiChatLabPages = () => import("./pages/aichatlab/AiChatLabLevelPage");
const AiChatLabLevelPage = lazyPage(AiChatLabPages, "AiChatLabLevelPage");
const AiChatLabModelCardLevelPage = lazyPage(
  AiChatLabPages,
  "AiChatLabModelCardLevelPage",
);
const SketchLabPages = () => import("./pages/sketchlab/SketchLabLevelPage");
const SketchLabLevelPage = lazyPage(SketchLabPages, "SketchLabLevelPage");
const SketchLabBlankProjectLevelPage = lazyPage(
  SketchLabPages,
  "SketchLabBlankProjectLevelPage",
);
const PythonLabLevelPage = lazyPage(
  () => import("./pages/pythonlab/PythonLabLevelPage"),
  "PythonLabLevelPage",
);
const PythonLabBlankProjectLevelPage = lazyPage(
  () => import("./pages/pythonlab/PythonLabBlankProjectLevelPage"),
  "PythonLabBlankProjectLevelPage",
);
const WebLab2GenericLevelPage = lazyPage(
  () => import("./pages/weblab2/WebLab2GenericLevelPage"),
  "WebLab2GenericLevelPage",
);
const WebLab2BlankDemoProjectLevelPage = lazyPage(
  () => import("./pages/weblab2/WebLab2BlankDemoProjectLevelPage"),
  "WebLab2BlankDemoProjectLevelPage",
);
const CadsParityPage = lazy(() => import("./pages/design-system/CadsParityPage"));

export default function App() {
  usePageTitle();

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to="/levels" replace />} />
        <Route path="/levels" element={<LevelsIndexPage />} />
        <Route path="/design-system/cads" element={<CadsParityPage />} />
        <Route path="/levels/aichatlab" element={<AiChatLabLevelPage />} />
        <Route
          path="/levels/aichatlab-setup"
          element={<Navigate to="/levels/aichatlab" replace />}
        />
        <Route
          path="/levels/aichatlab-model-card"
          element={<AiChatLabModelCardLevelPage />}
        />
        <Route path="/levels/sketchlab" element={<SketchLabLevelPage />} />
        <Route
          path="/levels/sketchlab-blank"
          element={<SketchLabBlankProjectLevelPage />}
        />
        <Route path="/levels/pythonlab" element={<PythonLabLevelPage />} />
        <Route
          path="/levels/pythonlab-blank"
          element={<PythonLabBlankProjectLevelPage />}
        />
        <Route
          path="/levels/weblab2-level"
          element={<WebLab2GenericLevelPage />}
        />
        <Route
          path="/levels/weblab2-demo-project"
          element={<Navigate to="/levels/weblab2-demo-project-blank" replace />}
        />
        <Route
          path="/levels/weblab2-demo-project-blank"
          element={<WebLab2BlankDemoProjectLevelPage />}
        />
        <Route path="*" element={<Navigate to="/levels" replace />} />
      </Routes>
    </Suspense>
  );
}
