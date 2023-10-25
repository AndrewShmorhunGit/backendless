import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tab } from "./types";

export function App() {
  const [isTabs, setTabs] = React.useState<Tab[]>([]);

  React.useEffect(() => {
    fetch("/tabs.json")
      .then((response) => response.json())
      .then((data) =>
        setTabs(data.sort((a: Tab, b: Tab) => a.order - b.order))
      );
  }, []);

  const renderTabComponent = (path: string) => {
    const Component = React.lazy(
      () => import(`./tabs/${path.split(".")[0]}.tsx`)
    );
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component />
      </React.Suspense>
    );
  };

  return (
    <Router>
      <div>
        <nav>
          {isTabs.map((tab) => (
            <Link key={tab.id} to={tab.id}>
              {tab.title}
            </Link>
          ))}
        </nav>
        <Routes>
          {isTabs.map((tab) => (
            <Route
              key={tab.id}
              path={tab.id}
              element={renderTabComponent(tab.path)}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}
