import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import type { Resume } from "../types";
import type { ResumePopulate } from "@/lib/service/editor";
import { useShallow } from "zustand/shallow";

type EditorSettings = {
  zoomLevel: number;
};
interface State extends ResumePopulate {
  // Editor settings
  settings: EditorSettings;

  actions: {
    setEditor: (payload: ResumePopulate) => void;
    setPersonalInfo: (payload: Partial<Resume["personalInfo"]>) => void;
    updatePersonalInfo: (
      key: keyof Resume["personalInfo"],
      payload: any,
    ) => void;
    setAboutMe: (payload: Resume["aboutMe"]) => void;
    setExperiences: (payload: Resume["experiences"]) => void;
    addNewExperience: (payload: Resume["experiences"][0]) => void;
    updateExperience: (
      index: number,
      payload: Partial<Resume["experiences"][0]>,
    ) => void;
    deleteExperiences: (index: number) => void;
    setSkills: (payload: Resume["skills"]) => void;
    deleteSkills: (index: number) => void;
    setProjects: (payload: Resume["projects"]) => void;
    addNewProject: (payload: Resume["projects"][0]) => void;
    updateProject: (
      index: number,
      payload: Partial<Resume["projects"][0]>,
    ) => void;
    deleteProjects: (index: number) => void;
    setEducations: (payload: Resume["educations"]) => void;
    addNewEducation: (payload: Resume["educations"][0]) => void;
    updateEducation: (
      index: number,
      payload: Partial<Resume["educations"][0]>,
    ) => void;
    deleteEducations: (index: number) => void;
    setAddons: (payload: Resume["addons"]) => void;
    addNewAddon: (payload: Resume["addons"][0]) => void;
    updateAddons: (
      key: keyof State["addons"],
      payload: Partial<Resume["addons"]>,
    ) => void;
    deleteAddons: (key: keyof State["addons"]) => void;

    updateMeta: (payload: Partial<Record<string, unknown>>) => void;

    // Setting action
    setEditorSettings: (payload: Partial<EditorSettings>) => void;

    // Reset state
    resetEditor: () => void;
  };
}

const useEditorStore = create<State>()(
  devtools(
    persist(
      immer((set, _, store) => ({
        personalInfo: {
          name: "",
          email: "",
          contactNo: "",
          address: "",
          github: "",
          linkedin: "",
          role: "",
        },

        aboutMe: "",

        experiences: [
          {
            companyName: "",
            role: "",
            duration: "",
            description: [""],
          },
        ],

        skills: [],

        projects: [
          {
            name: "",
            link: "",
            repoLink: "",
            description: [""],
          },
        ],

        educations: [
          {
            institute: "",
            course: "",
            duration: "",
            grade: "",
          },
        ],

        addons: {},
        meta: {},
        id: "",

        settings: {
          zoomLevel: 100,
        },

        actions: {
          setEditor(payload) {
            set((state) => {
              state.id = payload.id;
              state.meta = payload.meta;
              state.personalInfo = payload.personalInfo;
              state.aboutMe = payload.aboutMe;
              state.experiences = payload.experiences;
              state.projects = payload.projects;
              state.educations = payload.educations;
              state.skills = payload.skills;
              state.addons = payload.addons;
            });
          },
          setPersonalInfo: (payload) => {
            set((state) => {
              state.personalInfo = { ...state.personalInfo, ...payload };
            });
          },
          updatePersonalInfo(key, payload) {
            set((state) => {
              state.personalInfo[key] = payload;
            });
          },

          setAboutMe: (payload) => {
            set((state) => {
              state.aboutMe = payload;
            });
          },

          setExperiences: (payload) => {
            set((state) => {
              state.experiences = payload;
            });
          },
          addNewExperience: (payload) => {
            set((state) => {
              state.experiences.push(payload);
            });
          },
          updateExperience(index, payload) {
            set((state) => {
              state.experiences[index] = {
                ...state.experiences[index],
                ...payload,
              };
            });
          },
          deleteExperiences(index) {
            set((state) => {
              state.experiences.splice(index, 1);
            });
          },

          setSkills: (payload) => {
            set((state) => {
              state.skills = payload;
            });
          },
          deleteSkills(index) {
            set((state) => {
              state.skills.splice(index, 1);
            });
          },

          setProjects: (payload) => {
            set((state) => {
              state.projects = payload;
            });
          },
          addNewProject: (payload) => {
            set((state) => {
              state.projects.push(payload);
            });
          },
          updateProject(index, payload) {
            set((state) => {
              state.projects[index] = { ...state.projects[index], ...payload };
            });
          },
          deleteProjects(index) {
            set((state) => {
              state.projects.splice(index, 1);
            });
          },

          setEducations: (payload) => {
            set((state) => {
              state.educations = payload;
            });
          },
          addNewEducation: (payload) => {
            set((state) => {
              state.educations.push(payload);
            });
          },
          updateEducation(index, payload) {
            set((state) => {
              state.educations[index] = {
                ...state.educations[index],
                ...payload,
              };
            });
          },
          deleteEducations(index) {
            set((state) => {
              state.educations.splice(index, 1);
            });
          },

          setAddons: (payload) => {
            set((state) => {
              state.addons = payload;
            });
          },
          addNewAddon(payload) {
            set((state) => {
              Object.assign(state, payload);
            });
          },
          updateAddons(key, payload) {
            set((state) => {
              state.addons[key] = { ...(state.addons[key] || {}), ...payload };
            });
          },
          deleteAddons(key) {
            set((state) => {
              delete state.addons[key];
            });
          },

          updateMeta(payload) {
            set((state) => {
              state.meta = { ...state.meta, ...payload };
            });
          },

          setEditorSettings(payload) {
            set((state) => {
              state.settings = { ...state.settings, ...payload };
            });
          },

          resetEditor() {
            set(store.getInitialState());
          },
        },
      })),
      {
        name: "editor",
        partialize: (state) => ({
          aboutMe: state.aboutMe,
          personalInfo: state.personalInfo,
          experiences: state.experiences,
          projects: state.projects,
          educations: state.educations,
          skills: state.skills,
        }),
      },
    ),
    {
      name: "editorStore",
    },
  ),
);

export const useEditorState = () =>
  useEditorStore(
    useShallow((state) => ({
      personalInfo: state.personalInfo,
      aboutMe: state.aboutMe,
      experiences: state.experiences,
      skills: state.skills,
      projects: state.projects,
      educations: state.educations,
      addons: state.addons,
      meta: state.meta,
      id: state.id,
    })),
  );

export const useEditorActions = () => useEditorStore((state) => state.actions);

export const useEditorPersonalInfo = () =>
  useEditorStore((state) => state.personalInfo);

export const useEditorAboutMe = () =>
  useEditorStore(useShallow((state) => state.aboutMe));

export const useEditorExperiences = () =>
  useEditorStore(useShallow((state) => state.experiences));

export const useEditorSkills = () =>
  useEditorStore(useShallow((state) => state.skills));

export const useEditorProjects = () =>
  useEditorStore(useShallow((state) => state.projects));

export const useEditorEducations = () =>
  useEditorStore(useShallow((state) => state.educations));

export const useEditorMeta = () =>
  useEditorStore(useShallow((state) => ({ id: state.id, ...state.meta })));

export const useEditorSettings = () =>
  useEditorStore(useShallow((state) => state.settings));
