import { useCallback, useMemo, useState } from "react";
import { WordDefinition } from "./GuessWordContainer";

type Props = {
  wordDefinition: WordDefinition;
  progress: number;
  displayNextWord(incrementingScore: boolean): void;
};

function WordCardContent({ wordDefinition, progress, displayNextWord }: Props) {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [knowsTheDefinition, setKnowsTheDefinition] = useState<boolean | undefined>(undefined);
  console.log(
    `wordDefinition: ${wordDefinition.word}, hasAnswered : ${hasAnswered}, knowsTheDefinition: ${knowsTheDefinition}`
  );

  const displayNextWordAndResetState = (incrementingScore: boolean) => {
    displayNextWord(incrementingScore);
    setHasAnswered(false);
    setKnowsTheDefinition(undefined);
  };

  const answer = () => setHasAnswered(true);
  const answerAndKnow = useCallback(() => {
    answer();
    setKnowsTheDefinition(true);
  }, []);

  const answerAndDontKnow = useCallback(() => {
    answer();
    setKnowsTheDefinition(false);
  }, []);

  const generateButton = useCallback((text: string, action: () => void, color: "primary" | "warning") => {
    return (
      <div className="column is-centered">
        <button className={"button is-" + color + " is-large has-text-weight-bold is-fullwidth"} onClick={action}>
          {text}
        </button>
      </div>
    );
  }, []);

  const answerButtons = useMemo(() => {
    const IKnowButton = generateButton("Je sais !", answerAndKnow, "primary");
    const IDontKnowButton = generateButton("Je sais pas", answerAndDontKnow, "warning");

    return (
      <div className="columns">
        {IKnowButton}
        {IDontKnowButton}
      </div>
    );
  }, []);

  const hasAnsweredAndKnowsButtons = useMemo(() => {
    const next = () => displayNextWordAndResetState(false);
    const nextAndIncrementScore = () => displayNextWordAndResetState(true);
    const IConfirmIKnewButton = generateButton("Je confirme que je sais", nextAndIncrementScore, "primary");
    const FinallyIDidntKnowButton = generateButton("Ah ! En fait, non, je ne l'avais pas", next, "warning");

    return (
      <div className="columns">
        {IConfirmIKnewButton}
        {FinallyIDidntKnowButton}
      </div>
    );
  }, [wordDefinition]);

  const hasAnsweredAndDontKnowsButtons = useMemo(
    () => (
      <div className="columns">
        {generateButton("C'est lu. Allez la suite !", () => displayNextWordAndResetState(false), "primary")}
      </div>
    ),
    [wordDefinition]
  );

  const buttons = useMemo(() => {
    if (!hasAnswered) return answerButtons;
    return knowsTheDefinition ? hasAnsweredAndKnowsButtons : hasAnsweredAndDontKnowsButtons;
  }, [knowsTheDefinition]);

  const definitionContainer = <p className="has-text-centered">{wordDefinition.definition}</p>;

  return (
    <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between">
      <progress className="progress is-info" value={progress} max="100" />

      <div className="title is-1 has-text-centered has-text-weight-bold mb-0">{wordDefinition.word}</div>

      {hasAnswered && definitionContainer}
      {buttons}
    </div>
  );
}

export default WordCardContent;
