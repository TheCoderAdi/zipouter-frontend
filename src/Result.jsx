import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/CompilationResult.css";
import { getThemeObject, themes } from "./helpers/theme";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import ResultCard from "./components/ResultCard";
import ResultCards from "./components/ResultCards";

const Result = () => {
  const { state } = useLocation();
  const navigation = useNavigate();

  const [theme, setTheme] = useState(okaidia);
  const storedTheme = localStorage.getItem("theme") || okaidia;
  useEffect(() => {
    if (state === null) navigation("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", okaidia);
  }, [theme]);
  const currentTheme = getThemeObject(theme) || getThemeObject(storedTheme);
  if (state === null) {
    return;
  }
  return (
    <div className="results-container">
      <h1>Results of the Java file</h1>
      <span>Choose a theme:</span>
      <select
        className="theme-select"
        onChange={(e) => {
          setTheme(e.target.value);
        }}
      >
        {themes.map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      {state.single
        ? state &&
          state.result.map((result, index) => {
            return (
              <ResultCards
                key={index}
                result={result}
                currentTheme={currentTheme}
              />
            );
          })
        : null}
      {state.multiple
        ? state &&
          state.result.map((result, index) => {
            return (
              <ResultCard
                key={index}
                result={result.compilationResults}
                currentTheme={currentTheme}
              />
            );
          })
        : null}
    </div>
  );
};

export default Result;
