import { useImportResumes } from '@/hooks/useImportsResumes';
import { Flex, FlexCenter, FlexColumn } from './layout';
import { FileText } from 'lucide-react';
import { cn } from 'cn';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconCircle,
  IconCircleCheckFilled,
  IconX,
} from '@tabler/icons-react';
import { useState, type ChangeEvent } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import useServices from '@/hooks/useServices';
import { useResumeActions } from '@/store';
import { toast } from '../ui/toast';
import { useModalActions } from '@/store/modal';
import { Alert, AlertTitle } from '../ui/alert';
import FilePicker from './FilePicker';

function ImportResumes() {
  const [selectedIDs, setSelectedIDs] = useState<Set<string>>(new Set());
  const [isOverride, setIsOverride] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    onJSONPick,
    conflictedResumes,
    importedResumes,
    onImportConfirm,
    failedImports,
    clearImport,
  } = useImportResumes();
  const { services } = useServices();
  const { setResumes } = useResumeActions();
  const { closeModal } = useModalActions();

  function handleChangeIDSelect(id: string) {
    setSelectedIDs((prev) => {
      const updatedIds = new Set(prev);
      if (prev?.has(id)) {
        updatedIds.delete(id);
      } else {
        updatedIds.add(id);
      }
      return updatedIds;
    });
  }

  async function handleFilePick(event: ChangeEvent<HTMLInputElement>) {
    try {
      await onJSONPick(event);
    } catch (error) {
      setError(error as Error);
    }
  }

  async function handleImport() {
    const overrideIDs = Array.from(selectedIDs ?? []);
    try {
      const results = await onImportConfirm(overrideIDs, isOverride);
      // refetch all resumes
      const resumes = await services?.resumeSrv.getResumes();
      if (resumes?.length) {
        setResumes(resumes);
      }

      const hasRejectedResume = results?.some(
        (res) => res.status === 'rejected',
      );
      if (!hasRejectedResume) {
        toast.add({
          type: 'success',
          title: 'Your resumes imported successfully!',
        });
        closeModal();
      }
    } catch (error) {
      setError(error as Error);
    }
  }

  function handleClear() {
    setError(null);
    clearImport();
  }

  function handleClearSelection() {
    setSelectedIDs(new Set());
  }

  function handleSelectNonConflictResumesOnly() {
    setSelectedIDs(() => {
      const nonconflictIds = new Set<string>();
      importedResumes?.forEach((resume) => {
        const isConflicted = conflictedResumes?.has(resume.id);
        if (!isConflicted) {
          nonconflictIds.add(resume.id);
        }
      });

      return nonconflictIds;
    });
  }

  const totalResume = importedResumes?.length ?? 0;
  const totalConflictedResume = conflictedResumes?.size ?? 0;
  const totalNonConflictedResume = totalResume - totalConflictedResume;
  const totalSelectedResume = selectedIDs?.size ?? 0;

  return (
    <FlexColumn className="gap-4">
      {error && (
        <Alert variant="destructive">
          <IconAlertTriangle />
          <AlertTitle>{error.message}</AlertTitle>
        </Alert>
      )}

      <FilePicker onChange={handleFilePick} clearFile={handleClear} />

      {totalResume > 0 ? (
        <FlexColumn className="gap-3">
          <Flex className="flex-wrap items-center gap-4 border-b py-2">
            <span className="text-xs">
              Total:{' '}
              <Badge
                variant="secondary"
                className="bg-alert-info/15 text-alert-info-text"
              >
                {totalResume}
              </Badge>
            </span>
            <span className="text-xs">
              Conflicted:{' '}
              <Badge
                variant="secondary"
                className="bg-alert-danger/15 text-alert-danger"
              >
                {totalConflictedResume}
              </Badge>
            </span>
            <span className="text-xs">
              Non-conflicted:{' '}
              <Badge
                variant="secondary"
                className="bg-alert-success/15 text-alert-success"
              >
                {totalNonConflictedResume}
              </Badge>
            </span>
            <span className="text-xs">
              Selected:{' '}
              <Badge
                variant="secondary"
                className="bg-alert-success/15 text-alert-success"
              >
                {totalSelectedResume}
              </Badge>
            </span>

            {totalConflictedResume > 0 && totalSelectedResume > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSelectNonConflictResumesOnly}
              >
                Select non-conflict only
              </Button>
            )}

            {totalSelectedResume > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearSelection}
              >
                <IconX />
                Clear
              </Button>
            )}
          </Flex>

          <FlexColumn className="max-h-112 scrollbar-thin overflow-y-auto">
            {importedResumes?.map((resume, idx) => {
              const isConflicted = conflictedResumes?.has(resume.id);
              const isSelected = selectedIDs?.has(resume.id);

              return (
                <Flex
                  key={resume.id}
                  className={cn(
                    'gap-2 px-2 py-2 rounded-xs hover:shadow-xl bg-neutral-131313 cursor-default group hover:bg-neutral-131313',
                    isConflicted && 'bg-destructive/2',
                  )}
                  role="button"
                  onClick={() => handleChangeIDSelect(resume.id)}
                >
                  <FlexCenter className="relative mr-2 w-5">
                    <span
                      className={cn(
                        'group-hover:hidden text-muted-foreground',
                        isSelected && 'hidden!',
                      )}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={cn(
                        'scale-0 group-hover:scale-100 transition-all duration-300 cursor-pointer absolute shrink-0',
                        isSelected && 'scale-100!',
                      )}
                    >
                      {isSelected ? (
                        <IconCircleCheckFilled className="text-alert-success-text" />
                      ) : (
                        <IconCircle className="bg-neutral-131313" />
                      )}
                    </span>
                  </FlexCenter>
                  {failedImports?.has(resume.id) ? (
                    <IconAlertTriangleFilled className="text-destructive" />
                  ) : (
                    <FileText
                      size={18}
                      className={cn(
                        'mt-0.5 text-muted-foreground shrink-0',
                        isConflicted
                          ? 'text-destructive/50'
                          : 'text-emerald-500',
                      )}
                    />
                  )}
                  <Flex className="flex-1 flex-wrap gap-3">
                    <FlexColumn className="gap-0.5">
                      <h3>{resume.meta?.title}</h3>
                      <p className="text-muted-foreground text-xs">
                        {resume.meta.description}
                      </p>
                      {failedImports?.has(resume.id) && (
                        <p className="text-destructive text-xs">
                          Reason: {failedImports.get(resume.id)}
                        </p>
                      )}
                    </FlexColumn>
                    {isConflicted ? (
                      <Badge variant="destructive" className="text-xs!">
                        Name conflict
                      </Badge>
                    ) : (
                      <Badge className="bg-alert-success/15 text-alert-success-text text-xs!">
                        Ready to import
                      </Badge>
                    )}
                  </Flex>
                </Flex>
              );
            })}
          </FlexColumn>
          <FlexColumn className="justify-end gap-2">
            <Flex className="items-center justify-end gap-1">
              <Checkbox
                checked={isOverride}
                id="override"
                onCheckedChange={setIsOverride}
              />
              <Label
                htmlFor="override"
                className="text-muted-foreground text-sm"
              >
                Override conflicted
              </Label>
            </Flex>
            {!isOverride && (
              <Flex className="justify-end">
                <Alert className="border-alert-warning w-fit rounded-sm">
                  <IconAlertCircle className="text-alert-warning" />
                  <AlertTitle className="text-alert-warning">
                    Conflicted resumes will be skipped
                  </AlertTitle>
                </Alert>
              </Flex>
            )}
          </FlexColumn>
          <Flex className="justify-end gap-4">
            <Button variant="secondary" type="reset" onClick={closeModal}>
              Cancel
            </Button>
            {totalSelectedResume > 0 && (
              <Button onClick={handleImport}>
                Import selected ({totalSelectedResume})
              </Button>
            )}
            {!totalSelectedResume && (
              <Button onClick={handleImport} disabled={!totalResume}>
                Import
              </Button>
            )}
          </Flex>
        </FlexColumn>
      ) : (
        <Flex className="justify-end">
          <Button onClick={closeModal}>Cancel</Button>
        </Flex>
      )}
    </FlexColumn>
  );
}

export default ImportResumes;
