export type JSONDataPayload<TData> = {
  taskID?: string;
  payload?: TData;
  status: "PROCESS_PAYLOAD" | "END_BATCH";
  type: "IMPORT" | "EXPORT";
};

export type JSONResult<TResult> = {
  taskID: string;
  result: TResult;
  type: "TASK_FAIL" | "RESULT" | "DONE";
  error: string;
};
