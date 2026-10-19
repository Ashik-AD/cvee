import { FileText, Pencil } from 'lucide-react';

import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'wouter';
import { Flex, FlexColumn } from '../common/layout';
import { Badge } from '../ui/badge';
import { resumeStatusStyles } from '@/features/dashboard/constant';
import ResumeDropdownMenu from '@/features/dashboard/components/ResumeDropdownMenu';
import { getLastModifiedTime } from '@/utils/getLastModifiedTime';

type ResumeCardProps = {
  title: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPrint: (id: string) => void;
  status: 'draft' | 'inProgress' | 'complete';
};

export function ResumeCard({
  title,
  description,
  createdAt,
  updatedAt,
  id,
  onDelete,
  onPreview,
  onPrint,
  status,
}: ResumeCardProps) {
  const mapStatus = resumeStatusStyles?.[status];
  const lastModified = getLastModifiedTime(updatedAt ?? createdAt ?? '');

  return (
    <Card className="border-border bg-card w-full rounded-sm py-0 shadow-none">
      <CardHeader className="gap-3 px-4 py-1">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <Badge className={cn(mapStatus.className, 'rounded-full text-xs')}>
            {mapStatus?.label}
          </Badge>
          <div className="flex items-center justify-end">
            <Link href={`/editor?id=${id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground size-7 rounded-xs"
              >
                <Pencil className="size-3.5" />
                <span className="sr-only">Edit resume</span>
              </Button>
            </Link>

            <ResumeDropdownMenu
              id={id}
              onPreview={onPreview}
              onPrint={onPrint}
              onDelete={onDelete}
            />
          </div>
        </div>
        {/* Title */}
      </CardHeader>

      <CardContent className="flex h-full items-start gap-3 space-y-3 px-4 pb-3">
        <div>
          <Flex
            className={cn(
              'text-green-600 p-2 items-center justify-center bg-green-500/10 rounded-[0.5rem]',
              mapStatus.className,
            )}
          >
            <FileText />
          </Flex>
        </div>
        <FlexColumn className="h-full flex-1 justify-between gap-4">
          <FlexColumn className="gap-2">
            <Link
              href={`/editor?id=${id}`}
              className="text-foreground text-sm leading-6 font-medium hover:underline"
            >
              {title}
            </Link>

            <p className="text-muted-foreground text-xs leading-5">
              {description}
            </p>
          </FlexColumn>

          <span className="text-muted-foreground text-xs">{lastModified}</span>
        </FlexColumn>
        {/* Metadata */}
      </CardContent>
    </Card>
  );
}
