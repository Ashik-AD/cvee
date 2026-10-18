import {
  normalizeJsonToExport,
  parseImportedJSON,
} from "@/utils/normalizeJSON";
import type { ResumePopulate } from "../model/resume";
import { toError } from "./utils";
import type { JSONDataPayload } from "./type";

let batchEnd = false;
let pendingTask = 0;

self.onmessage = async (
  event: MessageEvent<JSONDataPayload<ResumePopulate>>,
) => {
  const data = event.data;
  try {
    pendingTask++;
    if (!data.payload && data.status !== "END_BATCH") {
      self.postMessage({
        error: toError(null, "EMPTY_RESUME", "Resume is empty"),
        type: "TASK_FAIL",
        result: undefined,
      });
      return;
    }

    if (data.status === "PROCESS_PAYLOAD") {
      const resume =
        data.type === "EXPORT"
          ? normalizeJsonToExport(JSON.stringify(data.payload))
          : parseImportedJSON(JSON.stringify(data.payload));

      self.postMessage({
        error: undefined,
        type: "RESULT",
        taskID: data.taskID,
        result: resume,
      });
      return;
    }

    if (data.status === "END_BATCH") {
      batchEnd = true;
    }
  } catch (error) {
    self.postMessage({
      error: toError(error, "JSON_PARSED_FAILED", "Failed to parse resume"),
      result: data.payload,
      taskID: data.taskID,
      type: "TASK_FAIL",
    });
  } finally {
    pendingTask--;
    finalizeMessageSend();
  }
};

function finalizeMessageSend() {
  if (!batchEnd || pendingTask !== 0) return;
  self.postMessage({ type: "DONE" });
}
