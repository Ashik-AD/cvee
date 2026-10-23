import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Flex, FlexColumn } from '../common/layout';
import { Download } from 'lucide-react';
import { useModalActions } from '@/store/modal';

function ImportResumeJSONCrard() {
  const { setModalOpen } = useModalActions();

  return (
    <Card className="border-border w-full rounded-sm shadow-none">
      <CardContent className="flex h-full flex-col items-center justify-center gap-6 px-4">
        <FlexColumn className="gap-2">
          <div className="text-center text-lg font-semibold">
            JSON Collection
          </div>
          <p className="text-Color-Neutral-8E9192 max-w-64 justify-center text-center text-xs leading-5 font-normal">
            If you've exported previous JSON collection, you can import and
            start editing.
          </p>
        </FlexColumn>
        <Flex className="justify-center">
          <Button
            onClick={() => setModalOpen('import-all-json')}
            variant="outline"
          >
            <Download /> Import JSONS
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
}

export default ImportResumeJSONCrard;
