import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const ResultCards = ({ result, currentTheme }) => {
  return (
    <div className="card">
      <h3>{result.fileName}</h3>
      <p className="output">Compilation Output:</p>
      <SyntaxHighlighter language="java" style={currentTheme}>
        {result.output}
      </SyntaxHighlighter>
    </div>
  );
};

export default ResultCards;

ResultCards.propTypes = {
  result: PropTypes.object.isRequired,
  currentTheme: PropTypes.object.isRequired,
};
