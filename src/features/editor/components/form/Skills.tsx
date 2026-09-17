import { Flex } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useEditorActions, useEditorSkills } from "../../store";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

function Skills() {
  const skills = useEditorSkills();
  const { setSkills, deleteSkills } = useEditorActions();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function checkSkillExist(skill: string | undefined) {
    if (!skill?.trim()) return;
    return skills?.some((val) => val?.toLowerCase() === skill?.toLowerCase());
  }

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  function handleAddNewSkill() {
    if (!inputRef.current) return;
    const newSkill = inputRef?.current?.value;
    if (!newSkill?.trim()) return;

    const isExist = checkSkillExist(newSkill);
    if (isExist) {
      resetInput();
      return;
    }
    setSkills([...skills, newSkill]);
    resetInput();
  }

  return (
    <Field>
      <FieldLabel>Technical Stack</FieldLabel>
      <Flex className="gap-2 flex-wrap">
        {skills.map((skill, idx) => {
          return (
            <Badge
              variant="secondary"
              className="flex gap-1 items-center"
              key={skill}
            >
              {skill}
              <button
                className="flex rounded-full hover:text-destructive cursor-pointer opacity-50 hover:opacity-100"
                onClick={() => deleteSkills(idx)}
              >
                <X className="size-4" />
              </button>
            </Badge>
          );
        })}
      </Flex>
      <Flex className="gap-1">
        <Input
          ref={inputRef}
          name="skills"
          placeholder="Type skill tag and press enter..."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAddNewSkill();
            }
          }}
          className="bg-neutral-0E0E0E"
        />
        <Button variant="outline" className="border-dashed" onClick={handleAddNewSkill}>
          <Plus />
          Add Skill
        </Button>
      </Flex>
    </Field>
  );
}

export default Skills;
