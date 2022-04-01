import { useCallback, useMemo, useState } from "react";
import "./GuessWordContainer.css";

type wordDefinitions = {
  word: string;
  definition: string;
};

const WORDS_DEFINITIONS: wordDefinitions[] = [
  { word: "cimaise", definition: "Moulure qui forme la partie supérieure d'une corniche." },
  { word: "acuité", definition: "Caractère aigu, intense. Degré de sensibilité (d'un sens)." },
  { word: "prosaïque", definition: "Qui tient trop de la prose. Qui manque d'élégance." },
  { word: "éphèbe", definition: "Adolescent grec. Jeune homme." },
  {
    word: "phéromone",
    definition:
      "Molécule chimique produite par un organisme, qui induit un comportement spécifique chez un autre membre de la même espèce.",
  },
  {
    word: "colluvion",
    definition: "Dépôt de sédiments qui se forme sur une petite distance et en fine couche sur un versant.",
  },
  {
    word: "syntagme",
    definition:
      "En linguistique, le syntagme est un constituant syntaxique et sémantique de la phrase. On l'appelle aussi groupe ou entité car il est composé d'un ou plusieurs mots allant jusqu'à la phrase simple.",
  },
  {
    word: "parataxe",
    definition:
      "Juxtaposition de propositions sans mot de liaison. Exemple : J’ai pris l’autobus à 2 heures. Il faisait très chaud. J’ai mangé au restaurant, chez Céleste, comme d’habitude. (Albert Camus, L'Étranger)",
  },
  {
    word: "asyndète",
    definition: "Absence de liaison entre deux termes ou groupes de termes en rapport étroit (ex. bon pied bon œil).",
  },
  {
    word: "anaphore",
    definition:
      "Répétition d'un mot en tête de plusieurs membres de phrase, pour obtenir un effet de renforcement ou de symétrie. Exemple : Paris ! Paris outragé ! Paris brisé ! Paris martyrisé !",
  },
];

const GuessWordContainer = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [knowsTheDefinition, setKnowsTheDefinition] = useState<boolean | undefined>(undefined);
  const [wordDefinitionIndex, setWordDefinitionIndex] = useState(0);
  const [isListTerminated, setIsListTerminated] = useState(false);
  const currentWordDefinition = useMemo(() => WORDS_DEFINITIONS[wordDefinitionIndex], [wordDefinitionIndex]);

  const answer = () => setHasAnswered(true);
  const answerAndKnow = useCallback(() => {
    answer();
    setKnowsTheDefinition(true);
  }, []);

  const answerAndDontKnow = useCallback(() => {
    answer();
    setKnowsTheDefinition(false);
  }, []);

  const increment = useCallback((wordDefinitionIndex: number) => {
    if (wordDefinitionIndex + 1 >= WORDS_DEFINITIONS.length) {
      setIsListTerminated(true);
    } else {
      setWordDefinitionIndex(wordDefinitionIndex + 1);
    }
  }, []);

  const displayNextWord = useCallback((wordDefinitionIndex: number) => {
    increment(wordDefinitionIndex);
    setHasAnswered(false);
    setKnowsTheDefinition(undefined);
  }, []);

  const definitionContainer = <p className="has-text-centered">{currentWordDefinition.definition}</p>;

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
    const next = () => displayNextWord(wordDefinitionIndex);
    const IConfirmIKnewButton = generateButton("Je confirme que je sais", next, "primary");
    const FinallyIDidntKnowButton = generateButton("Ah ! En fait, non, je ne l'avais pas", next, "warning");

    return (
      <div className="columns">
        {IConfirmIKnewButton}
        {FinallyIDidntKnowButton}
      </div>
    );
  }, [wordDefinitionIndex]);

  const hasAnsweredAndDontKnowsButtons = useMemo(
    () => (
      <div className="columns">
        {generateButton("C'est lu. Allez la suite !", () => displayNextWord(wordDefinitionIndex), "primary")}
      </div>
    ),
    [wordDefinitionIndex]
  );

  const buttons = useMemo(() => {
    if (!hasAnswered) return answerButtons;
    return knowsTheDefinition ? hasAnsweredAndKnowsButtons : hasAnsweredAndDontKnowsButtons;
  }, [knowsTheDefinition]);

  return (
    <div className="card guess-word-container">
      {isListTerminated ? (
        <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">FINI !</div>
      ) : (
        <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between">
          <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">
            {currentWordDefinition.word}
          </div>

          {hasAnswered && definitionContainer}
          {buttons}
        </div>
      )}
    </div>
  );
};

export default GuessWordContainer;
