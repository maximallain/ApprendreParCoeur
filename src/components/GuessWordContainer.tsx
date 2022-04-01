import { useCallback, useMemo, useState } from "react";
import "./GuessWordContainer.css";

const GuessWordContainer = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [knowsTheDefinition, setKnowsTheDefinition] = useState<boolean | undefined>(undefined);

  const answer = () => setHasAnswered(true);
  const answerAndKnow = () => {
    answer();
    setKnowsTheDefinition(true);
  };

  const answerAndDontKnow = () => {
    answer();
    setKnowsTheDefinition(false);
  };

  const definitionContainer = (
    <p className="has-text-centered">
      Qui a des connaissances approfondies dans une matière, en particulier des connaissances historiques.
    </p>
  );

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
    const IConfirmIKnewButton = generateButton(
      "Je confirme que je sais",
      () => console.log("Je confirme que je sais"),
      "primary"
    );
    const FinallyIDidntKnowButton = generateButton(
      "Ah ! En fait, non, je ne l'avais pas",
      () => console.log("Ah ! En fait, non, je ne l'avais pas"),
      "warning"
    );

    return (
      <div className="columns">
        {IConfirmIKnewButton}
        {FinallyIDidntKnowButton}
      </div>
    );
  }, []);

  const hasAnsweredAndDontKnowsButtons = useMemo(
    () => (
      <div className="columns">
        {generateButton("C'est lu. Allez la suite !", () => console.log("C'est lu. Allez la suite !"), "primary")}
      </div>
    ),
    []
  );

  const buttons = useMemo(() => {
    if (!hasAnswered) return answerButtons;
    return knowsTheDefinition ? hasAnsweredAndKnowsButtons : hasAnsweredAndDontKnowsButtons;
  }, [knowsTheDefinition]);

  return (
    <div className="card guess-word-container">
      <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between">
        <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">Erudit</div>

        {hasAnswered && definitionContainer}
        {buttons}
      </div>
    </div>
  );
};

export default GuessWordContainer;
