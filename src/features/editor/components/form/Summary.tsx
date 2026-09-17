import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useEditorAboutMe, useEditorActions } from "../../store";
import type { ChangeEvent } from "react";

function Summary() {
  const { setAboutMe } = useEditorActions();
  const aboutMe = useEditorAboutMe();

  function handleChangePersonalFields(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setAboutMe(value);
  }

  return (
    <Field>
      <FieldLabel htmlFor="aboutMe">Professional Bio</FieldLabel>
      <Textarea
        id="aboutMe"
        name="aboutMe"
        rows={3}
        value={aboutMe}
        onChange={handleChangePersonalFields}
        className="bg-neutral-0E0E0E"
      />
    </Field>
  );
}

export default Summary;
