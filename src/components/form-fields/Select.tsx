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
  const { form } = useFormContext();
  form.register(name);
  const value = form.getValues(name);
  const { errors } = form.formState;

  return (
    <Autocomplete
      multiple={multiple}
      disabled={disabled}
      options={options}
      getOptionLabel={option => option.label}
      disableCloseOnSelect={multiple}
      defaultValue={value}
      onChange={(_, value) => form.setValue(name, value)}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
          error={Boolean(errors[name])}
          helperText={errors[name] ? (errors[name]!.message as string) : ""}
        />
      )}
    />
  );
};

// Consolas, "Courier New";
