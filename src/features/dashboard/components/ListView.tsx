import { Flex, FlexColumn } from "@/components/common/layout";
import type { ResumePopulate } from "@/lib/service/editor";
import { getResumeStatus } from "@/utils/getResumeStatus";
import { FileText } from "lucide-react";
import { resumeStatusStyles } from "../constant";
import { cn } from "cn";
import { getLastModifiedTime } from "@/utils/getLastModifiedTime";
import ResumeDropdownMenu from "./ResumeDropdownMenu";
import { Link } from "wouter";

type ListViewProps = {
  resumes: ResumePopulate[];
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPrint: (id: string) => void;
};

function ListView({ resumes, onDelete, onPrint, onPreview }: ListViewProps) {
  return (
    <FlexColumn className="w-full">
      {resumes?.map((resume) => {
        const id = resume.id;
        const resumeStatus = getResumeStatus(resume);
        const mapStatus = resumeStatusStyles[resumeStatus];
        const lastModified = getLastModifiedTime(
          resume.meta.updatedAt ?? resume.meta.createdAt ?? "",
        );

        return (
          <Flex
            key={id}
            className="bg-neutral-171717 p-3 border-b border-neutral-000000/20 hover:bg-neutral-131313 transition duration-300 hover:shadow-lg justify-between gap-5"
          >
            <Flex className="gap-2 items-center truncate">
              <span className={cn(mapStatus.className, "p-1 rounded-sm h-fit")}>
                <FileText size={20} />
              </span>
              <div className="space-y-1 truncate">
                <Link
                  href={`/editor?id=${id}`}
                  className={cn(
                    mapStatus.label,
                    "text-gray-300 text-sm hover:underline truncate",
                  )}
                >
                  {resume.meta?.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {resume.meta?.description}
                </p>
              </div>
            </Flex>
            <Flex className="gap-4 items-center">
              <span
                className={cn(
                  "text-xs text-muted-foreground py-0.5 px-1.5 rounded-xl",
                  mapStatus.className,
                )}
              >
                {mapStatus.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {lastModified}
              </span>

              <ResumeDropdownMenu
                id={id}
                onPreview={onPreview}
                onPrint={onPrint}
                onDelete={onDelete}
              />
            </Flex>
          </Flex>
        );
      })}
    </FlexColumn>
  );
}

export default ListView;
