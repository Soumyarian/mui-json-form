import { useCallback } from "react";

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      console.log(data, validationSchema, "eueu");
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce((allErrors: any, currentError: any) => {
            const updatedPath = currentError.path
              .replace(/\[/g, ".")
              .replace(/\]/g, "");
            return {
              ...allErrors,
              [updatedPath]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            };
          }, {}),
        };
      }
    },
    [validationSchema]
  );
