import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BaseFormProps } from "@/types/components/baseForm";
import { FormFields } from "@/types/lib/form";
import React, { useEffect, useMemo, useRef } from "react";

export default function BaseForm({
  id,
  form,
  fields,
  onSubmit,
  className = "",
  storeUpdates,
}: BaseFormProps) {
  const memoizedFields = useMemo<FormFields[]>(() => fields, [fields]);
  const prevValuesRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (storeUpdates) {
      const currentValues = form.getValues();
      Object.keys(storeUpdates).forEach((fieldName) => {
        prevValuesRef.current[fieldName] = currentValues[fieldName];
      });
    }
  }, [form, storeUpdates]);

  useEffect(() => {
    if (form.formState.defaultValues) {
      Object.entries(form.formState.defaultValues).forEach(([name, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          const currentValue = form.getValues(name);
          if (
            currentValue === undefined ||
            currentValue === null ||
            currentValue === ""
          ) {
            form.setValue(name, value);
          }
        }
      });
    }
  }, [form, form.formState.defaultValues]);

  useEffect(() => {
    if (!storeUpdates) return;

    const subscription = form.watch((values) => {
      if (!values || !storeUpdates) return;

      Object.keys(storeUpdates).forEach((fieldName) => {
        const newValue = values[fieldName];
        const prevValue = prevValuesRef.current[fieldName];

        const hasValueChanged =
          typeof newValue === "object" && newValue !== null
            ? JSON.stringify(newValue) !== JSON.stringify(prevValue)
            : newValue !== prevValue;

        if (hasValueChanged && newValue !== undefined) {
          prevValuesRef.current[fieldName] =
            typeof newValue === "object" && newValue !== null
              ? JSON.parse(JSON.stringify(newValue))
              : newValue;

          storeUpdates[fieldName](newValue);
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [form, storeUpdates]);

  const renderFormField = (
    field: FormFields,
    index: number,
    parentPath = ""
  ) => {
    if ("groupFields" in field && field.groupFields) {
      return (
        <React.Fragment key={`group-${parentPath}-${index}`}>
          {"label" in field && field.label && (
            <div className="text-sm font-medium text-light-text dark:text-dark-text">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          <div className={field.rootClassNames || ""}>
            {field.components &&
              field.components.map((componentField, componentIndex) =>
                renderFormField(
                  componentField,
                  componentIndex,
                  `${parentPath}-${index}`
                )
              )}
          </div>
        </React.Fragment>
      );
    } else if ("notField" in field && field.notField) {
      return (
        <div
          key={`desc-${parentPath}-${index}`}
          className={field.rootClassNames || ""}
        >
          {field.label}
        </div>
      );
    } else {
      return (
        <FormField
          key={"name" in field ? field.name : `field-${parentPath}-${index}`}
          control={form.control}
          name={"name" in field ? field.name : ""}
          render={({ field: fieldProps }) => {
            const fieldName = "name" in field ? field.name : "";
            const defaultValue = form.formState.defaultValues?.[fieldName];
            const hasDefaultValue =
              defaultValue !== undefined &&
              defaultValue !== null &&
              defaultValue !== "";

            return (
              <FormItem>
                {"label" in field && field.label && (
                  <FormLabel className="text-light-text dark:text-dark-text">
                    {field.label}
                    {"validation" in field && field.validation?.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </FormLabel>
                )}
                <FormControl>
                  {"component" in field &&
                  "renderExtra" in field &&
                  field.renderExtra &&
                  field.component ? (
                    field.renderExtra(
                      React.cloneElement(field.component, {
                        ...fieldProps,
                        value: fieldProps.value || defaultValue,
                      })
                    )
                  ) : "component" in field &&
                    "rootClassNames" in field &&
                    field.component ? (
                    <div className={field.rootClassNames || ""}>
                      {React.cloneElement(field.component, {
                        ...fieldProps,
                        value: fieldProps.value || defaultValue,
                      })}
                    </div>
                  ) : "component" in field && field.component ? (
                    <>
                      {React.cloneElement(field.component, {
                        ...fieldProps,
                        value: fieldProps.value || defaultValue,
                      })}
                    </>
                  ) : null}
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />
      );
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <Form {...form}>
        <form
          id={id}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {memoizedFields.map((field, index) => renderFormField(field, index))}
        </form>
      </Form>
    </div>
  );
}
