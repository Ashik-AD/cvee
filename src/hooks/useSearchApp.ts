import { menu, type MenuAction } from "@/constants/menubar";
import type { ResumePopulate } from "@/lib/model/resume";
import { useResumeState } from "@/store";
import { useState } from "react";
import useDebounceCallback from "./useDebounceCallback";

export function useSearchApp() {
  const [searchResult, setSearchResult] = useState<{
    resumes: ResumePopulate[] | null;
    actions: MenuAction[] | null;
  }>({
    resumes: null,
    actions: null,
  });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { resumes } = useResumeState();

  const debounceSearchCb = useDebounceCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    // Reset search result
    if (!searchTerm?.trim()) {
      setSearchResult({
        resumes: null,
        actions: null,
      });
      return;
    }
    const term = searchTerm?.toLowerCase();

    const resumeSearchResult = searchResume(term);
    const menuSearchResult = searchMenuCommands(term);

    setSearchResult({
      resumes: resumeSearchResult,
      actions: menuSearchResult,
    });
  });

  function searchResume(searchTerm: string) {
    if (!searchTerm?.trim()) return null;
    let term = searchTerm?.toLowerCase();

    return resumes?.filter((resume) => {
      const {
        meta: { title, description },
        aboutMe,
        personalInfo: { name, role },
        experiences,
      } = resume;
      if (
        title?.toLowerCase()?.includes(term) ||
        description?.toLowerCase()?.includes(term) ||
        aboutMe?.toLowerCase()?.includes(term) ||
        name?.includes(term) ||
        role?.includes(term)
      )
        return true;

      const hasMatchedExperiences = experiences?.some(
        (exp) =>
          exp.role?.toLowerCase()?.includes(term) ||
          exp.companyName?.toLowerCase()?.includes(term),
      );
      if (hasMatchedExperiences) return true;

      return false;
    });
  }

  function searchMenuCommands(searchTerm: string) {
    if (!searchTerm?.trim()) return null;
    let term = searchTerm?.toLowerCase();

    const result: MenuAction[] = [];

    menu.forEach((item) => {
      item.actions?.forEach((act) => {
        if (act.type === "action") {
          if (act.label?.toLowerCase()?.includes(term)) {
            result.push(act);
          }
        }
      });
    });

    return result;
  }

  return { result: searchResult, onSearch: debounceSearchCb, searchTerm };
}
