import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { ResumePopulate } from "@/lib/service/editor";
import { useShallow } from "zustand/shallow";

type State = {
  resumes: ResumePopulate[];
  actions: {
    setResumes: (payload: ResumePopulate[]) => void;
  };
};

export const useResumeStore = create<State>()(
  devtools(
    immer((set) => ({
      resumes: [],

      actions: {
        setResumes: (payload) => {
          set((state) => {
            state.resumes = payload;
          });
        },
      },
    })),
    {
      name: "resumeStore",
    },
  ),
);

export const useResumeActions = () => useResumeStore((state) => state.actions);
export const useResumeState = () =>
  useResumeStore(
    useShallow((state) => ({
      resumes: state.resumes,
    })),
  );
