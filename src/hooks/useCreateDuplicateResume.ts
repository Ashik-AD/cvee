import { AppError, getErrorMessage } from "@/utils/error";
import useServices from "./useServices";
import { useResumeActions } from "@/store";

function generateNewName(
  oldName: string | null,
  oldNames: (string | null | undefined)[],
) {
  // if no name, provide default name
  if (!oldName?.trim()) return "New resume";

  const matchingNames = oldNames.filter((name) => name?.startsWith(oldName));

  // Extract number from the names
  const fileNameNumber = matchingNames
    .reduce<number[]>((ac, cur) => {
      const matching = cur?.match(/\d+/g)?.pop()?.trim();
      if (matching) {
        return ac.concat(Number(matching));
      }
      return ac;
    }, [])
    .sort((x, y) => x - y);

  // if no number in the filename just start with `1`
  if (!fileNameNumber.length) {
    return `${oldName} (duplicate 1)`;
  }

  // start with number that is missing
  let fileName: string = "";
  const greatest = fileNameNumber.pop() ?? 0;
  for (let i = 1; i <= greatest; i++) {
    const isExist = fileNameNumber.some((n) => n === i);
    // if `i` is last number, increase the file number for next name
    if (!isExist && i === greatest) {
      fileName = `${oldName} (duplicate ${i + 1})`;
      break;
    }

    if (!isExist) {
      fileName = `${oldName} (duplicate ${i})`;
      break;
    }
  }
  return fileName;
}

export default function useCreateDuplicateResume(id: string | null) {
  const { services } = useServices();
  const { addResume } = useResumeActions();

  return async function onCreate() {
    if (!id?.trim()) return;

    try {
      const resume = await services?.resumeSrv.getResumeById(id);
      if (!resume) {
        return;
      }
      const getResumeNames = await services?.resumeSrv.getResumesName();
      const resumeNames =
        getResumeNames?.map((resume: any) => resume?.name) ?? [];
      const newName = generateNewName(resume.meta?.title ?? "", resumeNames);

      const res = await services?.resumeSrv.createNewResume(resume, {
        ...resume.meta,
        title: newName,
      });
      if (res) {
        addResume(res);
        return res;
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      const msg = getErrorMessage(
        error,
        "Failed to duplicate resume. Please try again.",
      );
      throw new AppError(msg);
    }
  };
}
