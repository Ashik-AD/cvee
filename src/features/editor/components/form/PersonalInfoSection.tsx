import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEditorActions, useEditorPersonalInfo } from "../../store";
import type { ChangeEvent } from "react";
import type { PersonalInfo } from "../../types";

function PersonalInfoSection() {
  const { updatePersonalInfo } = useEditorActions();
  const info = useEditorPersonalInfo();

  function handleChangePersonalFields(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    updatePersonalInfo(name as keyof PersonalInfo, value);
  }

  return (
    <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
      {/* Fullname field */}
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          id="name"
          value={info.name}
          name="name"
          type="text"
          placeholder="John Doe"
          onChange={handleChangePersonalFields}
          className="bg-neutral-0E0E0E"
        />
      </Field>

      {/* Role field */}
      <Field>
        <FieldLabel htmlFor="role">Professional Role</FieldLabel>
        <Input
          id="role"
          name="role"
          value={info.role}
          type="text"
          onChange={handleChangePersonalFields}
          placeholder="Front-end Developer"
          className="bg-neutral-0E0E0E"
        />
      </Field>

      {/* Email field */}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={info.email}
          onChange={handleChangePersonalFields}
          placeholder="dev.ashikdhimal@gmail.com"
          className="bg-neutral-0E0E0E"
        />
      </Field>

      {/* Phone field */}
      <Field>
        <FieldLabel htmlFor="contactNo">Phone</FieldLabel>
        <Input
          id="contactNo"
          name="contactNo"
          type="text"
          value={info.contactNo}
          onChange={handleChangePersonalFields}
          placeholder="+977-9824965817"
          className="bg-neutral-0E0E0E"
        />
      </Field>

      {/* Address & Links field */}
      <FieldGroup className="grid col-span-2 grid-cols-1 sm:grid-cols-3">
        {/* Address field */}
        <Field>
          <FieldLabel htmlFor="address">Location</FieldLabel>
          <Input
            id="address"
            name="address"
            type="text"
            value={info.address}
            onChange={handleChangePersonalFields}
            placeholder="Kathmandu, Nepal"
            className="bg-neutral-0E0E0E"
          />
        </Field>

        {/* Github field */}
        <Field>
          <FieldLabel htmlFor="github">Github</FieldLabel>
          <Input
            id="github"
            name="github"
            type="text"
            value={info.github}
            onChange={handleChangePersonalFields}
            placeholder="@ashik-ad"
            className="bg-neutral-0E0E0E"
          />
        </Field>

        {/* Linked field */}
        <Field>
          <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
          <Input
            id="linkedin"
            name="linkedin"
            type="text"
            value={info.linkedin}
            onChange={handleChangePersonalFields}
            placeholder="ashikdhimal"
            className="bg-neutral-0E0E0E"
          />
        </Field>
      </FieldGroup>
    </FieldGroup>
  );
}

export default PersonalInfoSection;
