import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Tab } from "./types";
import { Spinner } from "./components/Spinner";

export default function App() {
  const [isTabs, setTabs] = React.useState<Tab[]>([]);

  const fetchWithDelay = (url: string, delay = 1000): Promise<Response> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(url).then((response) => resolve(response));
      }, delay);
    });
  };

  React.useEffect(() => {
    fetchWithDelay("/tabs.json")
      .then((response) => response.json())
      .then((data) =>
        setTabs(data.sort((a: Tab, b: Tab) => a.order - b.order))
      );
  }, []);

  const renderTabComponent = (path: string) => {
    const Component = React.lazy(
      () => import(`./tabs/${path.split(".")[0]}.tsx`) // fix warnings
    );
    return (
      <React.Suspense fallback={<Spinner />}>
        <Component />
      </React.Suspense>
    );
  };

  return (
    <Router>
      <div className="container">
        {isTabs.length ? (
          <>
            <nav className="tab-navigation">
              {isTabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.id}
                  target={tab.order > 2 ? "_blank" : ""}
                  rel={tab.order > 2 ? "noopener noreferrer" : ""}
                >
                  {tab.title}
                </Link>
              ))}
            </nav>
            <Routes>
              {isTabs.length > 0 && (
                <Route
                  path="/"
                  element={<Navigate replace to={isTabs[0].id} />}
                />
              )}
              {isTabs.map((tab) => (
                <Route
                  key={tab.id}
                  path={tab.id}
                  element={renderTabComponent(tab.path)}
                />
              ))}
            </Routes>
          </>
        ) : (
          <div className="loading-container">
            <Spinner />
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </Router>
  );
}
