import { FC, useEffect, useState } from "react";
import {
  Box,
  CardMedia,
  Stack,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { FiDelete, FiUpload } from "react-icons/fi";

import { useFormContext } from "../Form";
import { titleCaseToCamelCase } from "../utils";

interface Props {
  name: string;
  label: string;
  accept: "image/*" | "video/*";
  disabled?: boolean;
}

export const FileInput: FC<Props> = ({
  name,
  label,
  accept,
  disabled = false,
}) => {
  const { form } = useFormContext();
  form.register(name);
  form.watch(name);
  const value = form.getValues(name);
  const { errors } = form.formState;
  const [fileInputValue, setFileInputValue] = useState("");

  useEffect(() => {
    if (typeof value === "string") {
      setFileInputValue(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onloadend = () => {
        setFileInputValue(reader.result as string);
      };
    }
  }, [value]);

  return (
    <Stack gap={1} alignItems="flex-start">
      <Stack gap={0.25}>
        <Button startIcon={<FiUpload />} component="label" variant="contained">
          {label}
          <input
            hidden
            type="file"
            disabled={disabled}
            onChange={(e: any) => {
              const newFile = new File(
                [e.target.files[0]],
                titleCaseToCamelCase(e.target.files[0].name)
              );
              form.setValue(name, newFile);
            }}
            accept={accept}
          />
        </Button>
        {Boolean(errors[name]) && (
          <FormHelperText error>
            {errors[name]!.message as string}
          </FormHelperText>
        )}
      </Stack>
      {fileInputValue ? (
        <Box sx={{ position: "relative" }}>
          {accept === "image/*" ? (
            <CardMedia
              component="img"
              sx={{ width: "300px" }}
              alt="img"
              src={fileInputValue}
            />
          ) : accept === "video/*" ? (
            <video width={"200px"} controls={true}>
              <source src={fileInputValue} type="video/mp4"></source>
            </video>
          ) : null}
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <IconButton color="error" onClick={() => form.setValue(name, "")}>
              <FiDelete />
            </IconButton>
          </Stack>
        </Box>
      ) : null}
    </Stack>
  );
};
