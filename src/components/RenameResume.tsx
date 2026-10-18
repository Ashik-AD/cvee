import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Flex, FlexColumn } from "./common/layout";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useServices from "@/hooks/useServices";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useCommonActions, useResumeActions } from "@/store";
import { useEditorActions } from "@/features/editor/store";
import useGetResume from "@/hooks/useGetResume";
import { Textarea } from "./ui/textarea";

type RenameResumeProps = {
  id: string | null;
};

type Error = {
  title: string;
  desc?: string;
};

function RenameResume({ id }: RenameResumeProps) {
  const [error, setError] = useState<Error | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);

  const { services } = useServices();
  const { updateResume } = useResumeActions();
  const { updateMeta } = useEditorActions();
  const { toggleRenameResume } = useCommonActions();
  const { resume, isLoading } = useGetResume(id);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  // Pre-fill the rename input
  useEffect(() => {
    if (!id || isLoading) return;
    if (resume?.meta?.title) {
      if (inputRef.current) {
        inputRef.current.value = resume.meta.title ?? "";
      }
      if (descRef.current) {
        descRef.current.value = resume.meta.description ?? "";
      }
    }
  }, [id, isLoading, resume?.meta?.title]);

  // Handle `Escape` key press
  const handleKeyUp = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") toggleRenameResume();
  });

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  async function handleSubmit(eve: ChangeEvent<HTMLFormElement>) {
    eve.preventDefault();
    eve.stopPropagation();

    const formData = new FormData(eve.target);
    const resumeName = formData.get("resumeName")?.toString();
    const resumeDesc = formData.get("resumeDescription")?.toString();

    if (!id || !resumeName || !resumeName?.trim()) return;

    try {
      const resumesName = await services?.resumeSrv.getResumesName();
      if (resumesName) {
        const isNameExist = resumesName.some(
          (resume) => resume?.id !== id && resume?.name === resumeName,
        );
        if (isNameExist) {
          setError({
            title: `Name "${resumeName}" is already exist`,
            desc: "Add different name as possible. If you want same name try to use different character cases.",
          });
          return;
        }

        // Get complete resume detail
        if (!resume) {
          setError({
            title: `Resume not found with ID: ${id}`,
          });
          return;
        }

        if (resumeDesc?.trim()) {
          resume.meta.description = resumeDesc;
        }

        // Update db
        const updatedResume = await services?.resumeSrv.updateResume(id, {
          ...resume,
          meta: { ...resume.meta, title: resumeName || resume.meta.title },
        });
        if (!updatedResume) {
          setError({
            title: "Couldn't update the name.",
            desc: `Debug: ${updatedResume}`,
          });
          return;
        }
        // update editor meta title
        updateMeta(updatedResume.meta);
        // update the resume store
        updateResume(updatedResume);

        // clear error
        setError(null);

        // close rename dialog
        toggleRenameResume();
      }
    } catch (error: any) {
      setError({
        title: error?.name,
      });
      console.log(error);
    }
  }

  return (
    <Flex className="fixed h-screen w-screen inset-0 justify-center p-4 md:p-10">
      <FlexColumn className="flex z-1 bg-neutral-1C1B1B h-fit p-4 shadow-md gap-4 rounded-sm max-w-sm w-full border">
        <h2 className="text-sm">Rename</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            name="resumeName"
            placeholder="Resume name and press enter..."
            className="bg-neutral-131313"
            ref={inputRef}
          />
          <Textarea
            placeholder="Description..."
            rows={5}
            className="bg-neutral-131313"
            name="resumeDescription"
            ref={descRef}
          />

          <div>
            <Button
              type="reset"
              variant="secondary"
              onClick={toggleRenameResume}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{error.title}</AlertTitle>
            <AlertDescription>{error.desc ?? ""}</AlertDescription>
          </Alert>
        )}
      </FlexColumn>
      <div
        role="presentation"
        className="absolute h-full w-full bg-neutral-1C1B1B/20 inset-0"
        onClick={toggleRenameResume}
        onKeyUp={toggleRenameResume}
      />
    </Flex>
  );
}

export default RenameResume;
