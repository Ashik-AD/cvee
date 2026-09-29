import { Flex, FlexColumn, Grid } from "@/components/common/layout";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "../../types";
import { useEditorActions, useEditorExperiences } from "../../store";
import { Button } from "@/components/ui/button";
import type { ChangeEvent } from "react";
import { Plus } from "lucide-react";

type ExperienceFieldProps = Experience & {
  onChange: (values: Partial<Experience>) => void;
};

function ExperienceField({
  companyName,
  role,
  duration,
  description,
  onChange,
}: ExperienceFieldProps) {
  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    onChange?.({ [name]: value });
  }

  return (
    <FieldGroup className="bg-neutral-0E0E0E border border-neutral-2A2A2A rounded-xs p-2">
      <Flex className="gap-4">
        <Field>
          <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
          <Input
            id="companyName"
            name="companyName"
            value={companyName}
            placeholder="Galactico"
            className="max-w-md bg-neutral-1C1B1B"
            onChange={handleFieldChange}
          />
        </Field>

        <span className="text-xs text-nowrap text-muted-foreground font-semibold">
          {duration}
        </span>
      </Flex>

      <Grid className="grid-cols-1 sm:grid-cols-2 gap-2">
        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Input
            id="role"
            name="role"
            value={role}
            placeholder="Senior Software Engineer"
            onChange={handleFieldChange}
            className="bg-neutral-1C1B1B"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="duration">Period</FieldLabel>
          <Input
            id="duration"
            name="duration"
            value={duration}
            placeholder="2025 - Present"
            onChange={handleFieldChange}
            className="bg-neutral-1C1B1B"
          />
        </Field>
      </Grid>

      <Field>
        <FieldLabel htmlFor="description">Accomplishments</FieldLabel>
        <Textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          placeholder="- lazy"
          onChange={handleFieldChange}
          className="bg-neutral-1C1B1B"
        />
      </Field>
    </FieldGroup>
  );
}
function Experiences() {
  const experiences = useEditorExperiences();
  const { updateExperience, addNewExperience } = useEditorActions();

  function handleChange(index: number, experience: Partial<Experience>) {
    updateExperience(index, experience);
  }

  function handleAddNewExperience() {
    addNewExperience({
      companyName: "",
      role: "",
      description: [""],
      duration: "",
    });
  }

  return (
    <FlexColumn className="gap-4">
      {experiences?.map((experience, idx) => {
        return (
          <ExperienceField
            companyName={experience.companyName}
            role={experience.role}
            duration={experience.duration}
            description={experience.description}
            onChange={(newExperience) => handleChange(idx, newExperience)}
            key={idx}
          />
        );
      })}
      <Button
        variant="outline"
        className="border-dashed"
        onClick={handleAddNewExperience}
      >
        <Plus />
        Add experience
      </Button>
    </FlexColumn>
  );
}

export default Experiences;
