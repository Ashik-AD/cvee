import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { ResumePopulate } from "@/lib/model/resume";
import { useShallow } from "zustand/shallow";

type State = {
  resumes: ResumePopulate[];
  actions: {
    setResumes: (payload: ResumePopulate[]) => void;
    addResume: (payload: ResumePopulate) => void;
    updateResume: (payload: Partial<ResumePopulate>) => void;
    deleteResume: (id: string) => void;
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

        addResume(payload) {
          set((state) => {
            const resumeExist = state.resumes?.some(
              (resume) => resume.id === payload.id,
            );
            if (!resumeExist) {
              state.resumes.push(payload);
            }
          });
        },

        updateResume(payload) {
          set((state) => {
            const resumeIdx = state.resumes?.findIndex(
              (resume) => resume.id === payload.id,
            );
            if (!resumeIdx) {
              return;
            }

            const resumeData = state.resumes?.[resumeIdx];
            state.resumes[resumeIdx] = { ...resumeData, ...payload };
          });
        },

        deleteResume(id) {
          set((state) => {
            state.resumes = state.resumes?.filter((resume) => resume.id !== id);
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
