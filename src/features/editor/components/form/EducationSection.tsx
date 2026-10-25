import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useEditorActions, useEditorEducations } from '../../store';
import type { Education } from '@/lib/model/resume';
import { useId, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { FlexColumn } from '@/components/common/layout';
import { Plus } from 'lucide-react';
import SectionItemActions from './SectionItemActions';

interface EducationFieldProps extends Education {
  onChange: (values: Partial<Education>) => void;
  onDelete: () => void;
}

function EducationField({
  course,
  institute,
  grade,
  duration,
  onChange,
  onDelete,
}: EducationFieldProps) {
  const id = useId();

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    onChange?.({ [name]: value });
  }

  return (
    <FieldGroup className="bg-neutral-0E0E0E border-neutral-2A2A2A education-field grid rounded-xs border p-2 sm:grid-cols-2">
      {/*Institute field */}
      <Field>
        <FieldLabel htmlFor={`institute_${id}`}>School/University</FieldLabel>
        <Input
          id={`institute_${id}`}
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
        <FieldLabel htmlFor={`course_${id}`}>Degree</FieldLabel>
        <Input
          id={`course_${id}`}
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
        <FieldLabel htmlFor={`duration_${id}`}>Graduation Period</FieldLabel>
        <Input
          id={`duration_${id}`}
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
        <FieldLabel htmlFor={`grade_${id}`}>
          Grade / Honers (Optional)
        </FieldLabel>
        <Input
          id={`grade_${id}`}
          name="grade"
          type="number"
          value={grade}
          onChange={handleFieldChange}
          placeholder="4.0"
          className="bg-neutral-1C1B1B"
        />
      </Field>
      <div className="sm:col-span-2">
        <SectionItemActions onDelete={onDelete} />
      </div>
    </FieldGroup>
  );
}
function EducationSection() {
  const educations = useEditorEducations();
  const {
    updateEducation: updateEducations,
    addNewEducation,
    deleteEducations,
  } = useEditorActions();

  function handleChange(index: number, education: Partial<Education>) {
    updateEducations(index, education);
  }

  function handleAddNewEducation() {
    addNewEducation({
      grade: '',
      duration: '',
      institute: '',
      course: '',
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
            key={idx}
            onDelete={() => deleteEducations(idx)}
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
