import { FormFields } from "@/types/lib/form";
import { z } from "zod";

function isRegularField(field: FormFields): field is Extract<FormFields, { name: string }> {
  return !('notField' in field && field.notField);
}

const handleNumberValidation = (field: FormFields): z.ZodTypeAny => {
  if (!isRegularField(field)) {
    return z.any();
  }

  let schema = z.number({
    invalid_type_error: field.messages?.invalid,
  });

  if (field.validation?.min !== undefined) {
    schema = schema.min(field.validation.min, field.messages?.min);
  }

  if (field.validation?.max !== undefined) {
    schema = schema.max(field.validation.max, field.messages?.max);
  }

  if (field.validation?.integer) {
    schema = schema.int(field.messages?.integer);
  }

  return z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") {
      return undefined;
    }
    if (typeof val === "string") {
      const parsed = Number(val);
      return isNaN(parsed) ? val : parsed;
    }
    return val;
  }, schema);
};

const handleStringValidation = (field: FormFields): z.ZodTypeAny => {
  if (!isRegularField(field)) {
    return z.any();
  }

  let schema = z.string({
    invalid_type_error: field.messages?.invalid,
  });

  if (field.validation?.min !== undefined) {
    schema = schema.min(field.validation.min, field.messages?.min);
  }

  if (field.validation?.max !== undefined) {
    schema = schema.max(field.validation.max, field.messages?.max);
  }

  if (field.validation?.url) {
    schema = schema.url(field.messages?.url);
  }

  if (field.validation?.regex) {
    return z.union([
      z.literal(''),
      schema.regex(field.validation.regex, field.messages?.regex)
    ]);
  }

  return schema;
};

const handleEmailValidation = (field: FormFields): z.ZodTypeAny => {
  if (!isRegularField(field)) {
    return z.any();
  }

  let schema = z.union([
    z.literal(''),
    z.string({
      invalid_type_error: field.messages?.invalid,
    }).email(field.messages?.invalid)
  ]);

  return schema;
};

const handleMultiSelectValidation = (field: FormFields): z.ZodTypeAny => {
  if (!isRegularField(field)) {
    return z.any();
  }

  return z.array(z.any());
};

export function generateZodSchema(fields: FormFields[], customRefinement?: {
  refine: (data: any) => boolean;
  message: string;
  path?: string[];
}) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  const processFields = (fieldsList: FormFields[]) => {
    fieldsList.forEach((field) => {
      if ('groupFields' in field && field.groupFields && field.components) {
        processFields(field.components);
        return;
      }

      if (!isRegularField(field)) {
        return;
      }

      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case "number":
          fieldSchema = handleNumberValidation(field);
          break;

        case "string":
          fieldSchema = handleStringValidation(field);
          break;

        case "email":
          fieldSchema = handleEmailValidation(field);
          break;

        case "multiSelect":
          fieldSchema = handleMultiSelectValidation(field);
          break;

        default:
          fieldSchema = z.any();
      }

      if (field.validation?.required) {
        schemaObject[field.name] = z.union([
          fieldSchema,
          z.literal(''),
          z.null(),
          z.undefined()
        ]).refine((val) => {
          if (field.type === "multiSelect") {
            return Array.isArray(val) && val.length > 0;
          }
          return val !== undefined && val !== null && val !== '';
        }, {
          message: field.messages?.required || 'Trường này là bắt buộc'
        });
      } else {
        schemaObject[field.name] = fieldSchema.optional();
      }
    });
  };

  processFields(fields);

  let baseSchema = z.object(schemaObject);

  if (customRefinement) {
    return baseSchema.superRefine((data, ctx) => {
      if (!customRefinement.refine(data)) {
        customRefinement.path?.forEach(path => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: customRefinement.message,
            path: [path],
          });
        });
      }
    });
  }

  return baseSchema;
}
