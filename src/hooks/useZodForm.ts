import { generateZodSchema } from "@/lib/form";
import { FormFields, UseZodFormOptions } from "@/types/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useZodForm<T extends FormFields[]>(
  fields: T,
  options: UseZodFormOptions<T> = {}
) {
  const { initialValues, customRefinement, formOptions = {} } = options;

  const schema = generateZodSchema(fields, customRefinement);
  type FormValues = z.infer<typeof schema>;

  return useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {},
    values: initialValues || {},
    mode: "onChange",
    ...formOptions
  } as any);
}