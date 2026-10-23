import { Flex, FlexColumn, Grid } from '@/components/common/layout';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Experience } from '@/lib/model/resume';
import { useEditorActions, useEditorExperiences } from '../../store';
import { Button } from '@/components/ui/button';
import type { ChangeEvent } from 'react';
import { Plus } from 'lucide-react';
import SectionItemActions from './SectionItemActions';

type ExperienceFieldProps = Experience & {
  onChange: (values: Partial<Experience>) => void;
  onDelete: () => void;
};

function ExperienceField({
  companyName,
  role,
  duration,
  description,
  onChange,
  onDelete,
}: ExperienceFieldProps) {
  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    onChange?.({ [name]: value });
  }

  return (
    <FieldGroup className="bg-neutral-0E0E0E border-neutral-2A2A2A rounded-xs border p-2">
      <Flex className="gap-4">
        <Field>
          <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
          <Input
            id="companyName"
            name="companyName"
            value={companyName}
            placeholder="Galactico"
            className="bg-neutral-1C1B1B max-w-md"
            onChange={handleFieldChange}
          />
        </Field>

        <span className="text-muted-foreground text-xs font-semibold text-nowrap">
          {duration}
        </span>
      </Flex>

      <Grid className="grid-cols-1 gap-2 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Input
            id="role"
            name="role"
            value={role}
            placeholder="Software developer"
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
          placeholder="- write about the work you've done"
          onChange={handleFieldChange}
          className="bg-neutral-1C1B1B"
        />
      </Field>
      <SectionItemActions onDelete={onDelete} />
    </FieldGroup>
  );
}
function Experiences() {
  const experiences = useEditorExperiences();
  const { updateExperience, addNewExperience, deleteExperiences } =
    useEditorActions();

  function handleChange(index: number, experience: Partial<Experience>) {
    updateExperience(index, experience);
  }

  function handleAddNewExperience() {
    addNewExperience({
      companyName: '',
      role: '',
      description: [''],
      duration: '',
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
            onDelete={() => deleteExperiences(idx)}
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
