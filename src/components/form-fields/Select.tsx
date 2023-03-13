import { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { useFormContext } from "@/components/Form";
import { SelectOption } from "@/components/types";

interface Props {
  label: string;
  name: string;
  options: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const Select: FC<Props> = ({
  name,
  label,
  options,
  multiple = false,
  disabled = false,
  placeholder = "",
}) => {
  const { formik } = useFormContext();
  return (
    <Autocomplete
      multiple={multiple}
      disabled={disabled}
      options={options}
      getOptionLabel={option => option.label}
      value={formik.values[name]}
      onChange={(_, value) => formik.setFieldValue(name, value)}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
          error={formik.touched[name] ? Boolean(formik.errors[name]) : false}
          helperText={formik.touched[name] && (formik.errors[name] as string)}
        />
      )}
    />
  );
};
