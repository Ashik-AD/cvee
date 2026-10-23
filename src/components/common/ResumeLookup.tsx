import useServices from '@/hooks/useServices';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'wouter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FlexColumn } from './layout';
import { Alert } from '../ui/alert';
import { TriangleIcon } from 'lucide-react';

function ResumeLookup({
  onChange,
}: {
  onChange: (val: string | null) => void;
}) {
  const [lookupResume, setLookupResume] = useState<
    { label: string; id: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const { services } = useServices();
  const [params] = useSearchParams();

  const id = params.get('id');
  const resumeService = services?.resumeSrv;

  useEffect(() => {
    resumeService
      ?.resumeLookup()
      .then((result: { label: string; id: string }[]) => {
        setLookupResume(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [resumeService]);

  const transformLookup = useMemo(() => {
    if (!lookupResume.length) return [];
    const sortedResumes = lookupResume.sort((x) => (x.id === id ? -1 : 1));
    return sortedResumes?.map((resume) => ({
      label: resume.label,
      value: resume.id,
    }));
  }, [id, lookupResume]);

  const defaultSelected = transformLookup.find((lookup) => lookup.value === id);

  return (
    <FlexColumn>
      <Select
        items={transformLookup}
        defaultValue={defaultSelected?.value}
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger className="bg-neutral-0E0E0E w-full max-w-48">
          <SelectValue placeholder="Select resume" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Resumes</SelectLabel>
            {transformLookup.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label?.length > 12
                  ? item.label?.slice(0, 12).concat('...')
                  : item.label}{' '}
                {id === item.value && '(Active)'}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && (
        <Alert variant="destructive">
          <TriangleIcon size={18} />
          <span>{error}</span>
        </Alert>
      )}
    </FlexColumn>
  );
}

export default ResumeLookup;
