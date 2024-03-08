import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const ResultCard = ({ result, currentTheme }) => {
  return (
    <div className="card">
      {result.map((res, ind) => {
        return (
          <div key={ind}>
            <h3>{res.fileName}</h3>
            <p className="output">Compilation Output:</p>
            <SyntaxHighlighter language="java" style={currentTheme}>
              {res.output}
            </SyntaxHighlighter>
          </div>
        );
      })}
    </div>
  );
};
export default ResultCard;

ResultCard.propTypes = {
  result: PropTypes.array.isRequired,
  currentTheme: PropTypes.object.isRequired,
};
