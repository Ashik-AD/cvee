import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEditorActions, useEditorEducations } from "../../store";
import type { Education } from "../../types";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/common/layout";
import { Plus } from "lucide-react";

interface EducationFieldProps extends Education {
  onChange: (values: Partial<Education>) => void;
}

function EducationField({
  course,
  institute,
  grade,
  duration,
  onChange,
}: EducationFieldProps) {
  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    onChange?.({ [name]: value });
  }

  return (
    <FieldGroup className="grid sm:grid-cols-2 bg-neutral-0E0E0E border border-neutral-2A2A2A rounded-xs p-2">
      {/*Institute field */}
      <Field>
        <FieldLabel htmlFor="institute">School/University</FieldLabel>
        <Input
          id="institute"
          name="institute"
          type="text"
          value={institute}
          onChange={handleFieldChange}
          placeholder="Cambridge"
          className="bg-neutral-1C1B1B"
        />
      </Field>

      {/* Degree field */}
      <Field>
        <FieldLabel htmlFor="course">Degree</FieldLabel>
        <Input
          id="course"
          name="course"
          type="text"
          value={course}
          onChange={handleFieldChange}
          placeholder="B. in Computer Application"
          className="bg-neutral-1C1B1B"
        />
      </Field>

      {/* Graduation period field */}
      <Field>
        <FieldLabel htmlFor="duration">Graduation Period</FieldLabel>
        <Input
          id="duration"
          name="duration"
          type="text"
          value={duration}
          onChange={handleFieldChange}
          placeholder="2021-2024"
          className="bg-neutral-1C1B1B"
        />
      </Field>

      {/* Grade field */}
      <Field>
        <FieldLabel htmlFor="grade">Grade / Honers (Optional)</FieldLabel>
        <Input
          id="grade"
          name="grade"
          type="number"
          value={grade}
          onChange={handleFieldChange}
          placeholder="4.0"
          className="bg-neutral-1C1B1B"
        />
      </Field>
    </FieldGroup>
  );
}
function EducationSection() {
  const educations = useEditorEducations();
  const { updateEducation: updateEducations, addNewEducation } =
    useEditorActions();

  function handleChange(index: number, education: Partial<Education>) {
    updateEducations(index, education);
  }

  function handleAddNewEducation() {
    addNewEducation({
      grade: "",
      duration: "",
      institute: "",
      course: "",
    });
  }

  return (
    <FlexColumn className="gap-4">
      {educations?.map((education, idx) => {
        return (
          <EducationField
            institute={education.institute}
            course={education.course}
            duration={education.duration}
            grade={education.grade}
            onChange={(newExperience) => handleChange(idx, newExperience)}
            key={`${education.institute}${education.duration}_${idx}`}
          />
        );
      })}

      <Button
        variant="outline"
        className="border-dashed"
        onClick={handleAddNewEducation}
      >
        <Plus />
        Add Education
      </Button>
    </FlexColumn>
  );
}

export default EducationSection;
