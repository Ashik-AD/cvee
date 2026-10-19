import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Flex, FlexColumn } from '../common/layout';
import useCreateResume from '@/hooks/useCreateResume';
import { useResumeActions } from '@/store';
import { useLocation } from 'wouter';
import { Plus } from 'lucide-react';

function AddNewResumeCard() {
  const createNewResume = useCreateResume();
  const { addResume } = useResumeActions();
  const [_, navigate] = useLocation();

  async function handleCreateNew() {
    try {
      const newResume = await createNewResume();
      if (newResume) {
        addResume(newResume);
        navigate(`/editor?id=${newResume.id}`);
      }
      console.log(newResume);
    } catch (err) {
      console.log('Failed create new resume: ', err);
    }
  }

  return (
    <Card className="border-border w-full rounded-sm bg-emerald-900/20 shadow-none">
      <CardContent className="flex h-full flex-col items-center justify-center gap-6 px-4">
        <FlexColumn className="gap-2">
          <div className="text-center text-lg font-semibold">Create new CV</div>
          <p className="text-Color-Neutral-8E9192 max-w-64 justify-center text-center text-xs leading-5 font-normal">
            Start from scratch or choose from 6 ATS-optimized developer
            templates.
          </p>
        </FlexColumn>
        <Flex className="justify-center">
          <Button
            onClick={handleCreateNew}
            className="bg-green-700 text-white hover:bg-green-800"
          >
            <Plus /> New Document
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
}

export default AddNewResumeCard;
