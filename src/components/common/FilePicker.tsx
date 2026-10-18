import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Flex, FlexColumn } from "./layout";
import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { byteConversion } from "@/utils/byteConversion";

type FilePickerProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clearFile?: () => void;
};

function FilePicker({ onChange, clearFile }: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileMeta, setFileMeta] = useState<{
    name: string;
    size: number;
    sizeUnit: string;
    type: string;
  } | null>(null);

  function handleClearFile() {
    setFileMeta(null);
    clearFile?.();
    if (inputRef.current) {
      inputRef.current?.replaceWith(inputRef.current.value);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event?.target.files?.[0];
    if (file) {
      const name = file.name;
      const formatedSize = byteConversion(file.size);
      const type = file?.type?.includes("/")
        ? (file?.type?.split("/")[1] ?? file.type)
        : file.type;

      setFileMeta({
        name,
        size: formatedSize?.size ?? 0,
        sizeUnit: formatedSize?.unit || "Byte",
        type,
      });
    }

    onChange?.(event);
  }

  return (
    <>
      {!fileMeta && (
        <Label>
          <FlexColumn className="w-full bg-neutral-0E0E0E items-center justify-center gap-3 px-4 py-10 rounded-sm border border-dashed hover:bg-neutral-1C1B1B group">
            <Flex className="bg-neutral-2A2A2A size-14 items-center justify-center rounded-sm">
              <IconUpload size={32} className="group-hover:animate-bounce" />
            </Flex>
            <p>Drag and drop your schema file here, or Browse files</p>
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              ref={inputRef}
            />
          </FlexColumn>
        </Label>
      )}
      {fileMeta && (
        <Flex className="bg-neutral-0E0E0E p-3  rounded-md w-fit gap-2 items-center hover:shadow-lg">
          <IconFile className="text-emerald-600" />
          <FlexColumn className="gap-0.5">
            <span>{fileMeta.name}</span>
            <small className="text-muted-foreground">
              {fileMeta.size} {fileMeta.sizeUnit}
            </small>
          </FlexColumn>
          <Button
            variant="ghost"
            onClick={handleClearFile}
            className="rounded-full px-2 hover:bg-alert-danger/15 hover:text-alert-danger"
          >
            <IconX />
          </Button>
        </Flex>
      )}
    </>
  );
}

export default FilePicker;
