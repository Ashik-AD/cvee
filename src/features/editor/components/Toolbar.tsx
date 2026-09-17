import { Flex, Grid } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import usePrintResume from "@/hooks/usePrintResume";
import { Printer } from "lucide-react";

function Toolbar() {
  const onPrint = usePrintResume();

  return (
    <Grid className="editor-toolbar grid-cols-1 sm:grid-cols-2">
      <div>Editor toolbar</div>

      {/* Preview toolbar */}
      <Flex className="justify-end items-center gap-3">
        <Button
          onClick={onPrint}
          variant="outline"
          size="sm"
          className="rounded-none"
        >
          Export
          <Printer />
        </Button>
      </Flex>
    </Grid>
  );
}

export default Toolbar;
