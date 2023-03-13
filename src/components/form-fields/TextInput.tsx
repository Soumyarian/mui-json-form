import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "../Form";

interface Props {
  name: string;
  typographyProps: TextFieldProps;
  label: string;
}

export const TextInput: FC<Props> = ({ name, typographyProps, label }) => {
  const { formik } = useFormContext();

  return (
    <TextField
      type="text"
      label={label}
      fullWidth
      {...typographyProps}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && (formik.errors[name] as string)}
    />
  );
};
