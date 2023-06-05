import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "../Form";

interface Props {
  name: string;
  typographyProps: TextFieldProps;
  label: string;
}

export const TextInput: FC<Props> = ({ name, typographyProps, label }) => {
  const { form } = useFormContext();
  const { errors } = form.formState;
  return (
    <TextField
      type="text"
      label={label}
      fullWidth
      variant="standard"
      {...typographyProps}
      {...form.register(name)}
      error={Boolean(errors[name])}
      helperText={errors[name] ? (errors[name]!.message as string) : ""}
    />
  );
};
