import { FlexColumn, Grid } from '@/components/common/layout';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/lib/model/resume';
import { useEditorActions, useEditorProjects } from '../../store';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SectionItemActions from './SectionItemActions';

interface ProjectFieldProps extends Project {
  onChange: (values: Partial<Project>) => void;
  onDelete: () => void;
}

function ProjectField({
  name,
  description,
  repoLink,
  link,
  onChange,
  onDelete,
}: ProjectFieldProps) {
  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    onChange?.({ [name]: value });
  }
  return (
    <FieldGroup className="bg-neutral-0E0E0E border-neutral-2A2A2A rounded-xs border p-2">
      <Grid className="grid-cols-1 gap-2 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">Project Name</FieldLabel>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handleFieldChange}
            placeholder="Galactico"
            className="bg-neutral-1C1B1B"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="link">Link</FieldLabel>
          <Input
            id="link"
            name="link"
            value={link}
            onChange={handleFieldChange}
            placeholder="Galactico"
            className="bg-neutral-1C1B1B"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="repoLink">Repo. Link</FieldLabel>
          <Input
            id="repoLink"
            name="repoLink"
            value={repoLink}
            onChange={handleFieldChange}
            placeholder=""
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
          onChange={handleFieldChange}
          placeholder="- lazy"
          className="bg-neutral-1C1B1B"
        />
      </Field>
      <SectionItemActions onDelete={onDelete} />
    </FieldGroup>
  );
}
function Projects() {
  const projects = useEditorProjects();
  const { updateProject, addNewProject, deleteProjects } = useEditorActions();

  function handleChange(index: number, project: Partial<Project>) {
    updateProject(index, project);
  }

  function handleAddProject() {
    addNewProject({
      name: '',
      link: '',
      repoLink: '',
      description: [],
    });
  }
  return (
    <FlexColumn className="gap-4">
      {projects?.map((project, idx) => {
        return (
          <ProjectField
            key={idx}
            name={project.name}
            description={project.description}
            link={project.link}
            repoLink={project.repoLink}
            onChange={(newExperience) => handleChange(idx, newExperience)}
            onDelete={() => deleteProjects(idx)}
          />
        );
      })}
      <Button
        variant="outline"
        className="border-dashed"
        onClick={handleAddProject}
      >
        <Plus />
        Add Project
      </Button>
    </FlexColumn>
  );
}

export default Projects;
