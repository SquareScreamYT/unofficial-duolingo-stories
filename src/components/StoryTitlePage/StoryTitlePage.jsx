import React from "react";
import styles from "./StoryTitlePage.module.css";
import Button from "../Button";
import { useLocalisation } from "../LocalisationProvider/LocalisationProviderContext";

function StoryTitlePage({ story, next }) {
  const header = story.elements[0];
  const localisation = useLocalisation();

  return (
    <div className={styles.story_title_page}>
      <div>
        <img width="180" src={header.illustrationUrl} alt={"title image"} />
      </div>
      <div className={styles.story_title_page_title}>
        {header.learningLanguageTitleContent.text}
      </div>
      <div className={styles.story_title_page_button}>
        <Button primary onClick={next}>
          {localisation("button_start_story") || "Start the Story"}
        </Button>
      </div>
    </div>
  );
}

export default StoryTitlePage;
