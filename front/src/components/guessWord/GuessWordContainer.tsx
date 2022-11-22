import { useCallback, useMemo, useState } from "react";
import "./GuessWordContainer.css";
import WordCardContent from "./WordCardContent";

export type WordDefinition = {
  word: string;
  definition: string;
};

type Props = {
  wordDefinitions: WordDefinition[];
};

const GuessWordContainer = ({ wordDefinitions }: Props) => {
  const [wordDefinitionIndex, setWordDefinitionIndex] = useState(0);
  const [isListTerminated, setIsListTerminated] = useState(false);
  const [score, setScore] = useState(0);

  const currentWordDefinition = useMemo(() => wordDefinitions[wordDefinitionIndex], [wordDefinitionIndex]);
  const progress = useMemo(() => 100 * (wordDefinitionIndex / wordDefinitions.length), [wordDefinitionIndex]);

  const increment = useCallback((wordDefinitionIndex: number) => {
    if (wordDefinitionIndex + 1 >= wordDefinitions.length) {
      setIsListTerminated(true);
    } else {
      setWordDefinitionIndex(wordDefinitionIndex + 1);
    }
  }, []);

  const displayNextWord = (incrementingScore: boolean) => {
    increment(wordDefinitionIndex);
    if (incrementingScore) setScore(score + 1);
  };

  return (
    <div className="card guess-word-container">
      {isListTerminated ? (
        <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">
          Ton score : {score}/{wordDefinitions.length}
        </div>
      ) : (
        <WordCardContent wordDefinition={currentWordDefinition} progress={progress} displayNextWord={displayNextWord} />
      )}
    </div>
  );
};

export default GuessWordContainer;
