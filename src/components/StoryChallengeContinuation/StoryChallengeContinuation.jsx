import React from "react";
import styles from "./StoryChallengeContinuation.module.css";
import StoryQuestionPrompt from "../StoryQuestionPrompt";
import StoryTextLine from "../StoryTextLine";
import StoryQuestionMultipleChoice from "../StoryQuestionMultipleChoice";
import FadeGlideIn from "../FadeGlideIn";

function StoryChallengeContinuation({
  parts,
  setButtonStatus,
  active,
  hidden,
  settings,
}) {
  const [unhide, setUnhide] = React.useState(0);
  const id = React.useId();

  function advance(i, done) {
    setUnhide(-1);
    setButtonStatus("right");
  }
  if (settings.hide_questions) {
    if (active) setButtonStatus("continue");
    return (
      <FadeGlideIn key={`${id}-1`} hidden={hidden}>
        <StoryTextLine active={active} element={parts[1]} settings={settings} />
      </FadeGlideIn>
    );
  }

  return (
    <>
      <FadeGlideIn
        key={`${id}-1`}
        show={active || settings.show_all}
        hidden={hidden}
      >
        <StoryQuestionPrompt question={parts[0].prompt} lang={parts[0].lang} />
      </FadeGlideIn>
      <FadeGlideIn key={`${id}-2`} hidden={hidden}>
        <StoryTextLine
          active={active}
          element={parts[1]}
          unhide={unhide}
          settings={settings}
        />
      </FadeGlideIn>
      <FadeGlideIn
        key={`${id}-3`}
        show={active || settings.show_all}
        hidden={hidden}
      >
        <StoryQuestionMultipleChoice
          element={parts[2]}
          active={active}
          advance={advance}
        />
      </FadeGlideIn>
    </>
  );
}

export default StoryChallengeContinuation;
