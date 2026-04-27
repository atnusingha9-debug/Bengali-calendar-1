import { Routes, Route } from "react-router-dom";
import { buildRoutes } from "@/routes";

function App() {
  const routes = buildRoutes();
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
  );
}

export default App;
