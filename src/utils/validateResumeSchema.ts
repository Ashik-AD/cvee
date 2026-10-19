import type { ResumePopulate } from '@/lib/model/resume';
import { getErrorMessage } from './error';

/**
 * Validate Resume basic structure & values type
 * @param json ResumePopulate
 * */
export function validateResumeSchema(json: ResumePopulate) {
  const requireds = ['aboutMe', 'personalInfo', 'projects', 'skills'];
  // Not everyone have real world experience and educations
  const optionals = ['experiences', 'educations', 'additional'];
  const keys = Object.keys(json ?? {});

  if (keys.length === 0) {
    throw new Error('CV is empty');
  }

  const missingKeys = new Set<string>();
  const isRequiredExists = requireds.every((req) => {
    const has = keys.some((key) => key === req);
    if (has) return true;
    else {
      missingKeys.add(req);
      return false;
    }
  });
  if (!isRequiredExists)
    throw new Error(`Required key: ${missingKeys} is missing`);

  // Check unknown keys
  const combinedKyes = requireds.concat(optionals);
  for (let i = 0; i < keys.length; i++) {
    const lookupKey = keys[i];
    const hasFound = combinedKyes.some((key) => key === lookupKey);
    if (!hasFound) {
      throw new Error(`Unknown key: "${lookupKey}" found. Please remove it.`);
    }
  }

  // Validate values type
  // Personal details
  for (const key in json.personalInfo) {
    const value = json?.personalInfo?.[key as keyof typeof json.personalInfo];
    // Skip null or undefined key
    if (value && typeof value !== 'string') {
      throw new Error(`Invalid type: ${key}`);
    }
  }
  if (json.aboutMe && typeof json.aboutMe !== 'string') {
    throw new Error(`Invalid value 'aboutMe': ${json.aboutMe}`);
  }

  // Skills
  json.skills?.forEach((skill) => {
    if (typeof skill !== 'string') {
      throw new Error(`Invalid skill: ${skill}`);
    }
  });

  // Experiences
  validateComplexDetail(json.experiences, [
    'companyName',
    'duration',
    'role',
    'description',
  ]);

  // Projects
  validateComplexDetail(json.projects, [
    'name',
    'link',
    'repoLink',
    'description',
  ]);

  // Educations
  validateComplexDetail(json.educations, [
    'institute',
    'duration',
    'grade',
    'course',
  ]);
  return json;
}

/**
 * Called validator function with supplied arguments safely
 * @param args validator args
 * @param validator a function who validate schema
 * @returns args | Object containing `error` field
 * */
export function safeInvokeValidator<TF>(
  args: TF,
  validator: (args?: TF) => unknown,
) {
  try {
    return validator?.apply(args);
  } catch (error) {
    return {
      error: getErrorMessage(error, `Failed to validate schema`),
      trace: error,
    };
  }
}

/**
 * Validate given array of object
 * @NOTE: this only check `string` value type for now
 * */
function validateComplexDetail<T>(value: Array<T>, objKeys: Array<keyof T>) {
  for (const obj of value) {
    const keys = Object.keys(obj ?? {});
    keys.forEach((key) => {
      const hasKey = objKeys.some((expKey) => expKey === key);
      if (!hasKey) throw new Error(`Unknown key: ${key}`);

      const val = value?.[key as keyof typeof value];
      if (val && typeof val !== 'string') {
        throw new Error(`Invalid type value: ${key}: ${typeof val}`);
      }
    });
  }
}
