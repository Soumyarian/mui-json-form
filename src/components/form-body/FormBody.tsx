import React, { FC, Fragment } from "react";
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
  CardHeader,
  Collapse,
} from "@mui/material";
import { FormGroup, FormItem, FormSection } from "../types";
import { TextInput } from "../form-fields/TextInput";
import { FiPlus } from "react-icons/fi";
import { FormItemGroup } from "./FormItemGroup";

interface Props {
  sections: FormSection[];
  activeSectionIndex: number;
}

export const FormBody: FC<Props> = ({ sections, activeSectionIndex }) => {
  const getComponent = (
    c: FormItem | FormGroup,
    initialName: string,
    index: number,
    skipJsonName = false
  ) => {
    if (c.componentType === "group") {
      return (
        <Grid item xs={12}>
          <FormItemGroup title={c.title}>
            {({ show }) => (
              <Collapse in={show}>
                <CardContent>
                  <Stack gap={2}>
                    {c.components.map((child, childIndex) => {
                      let updatedName = `${initialName}.${c.jsonName}`;
                      if (c.groupType !== "object") {
                        updatedName += `.${index}`;
                      }
                      return (
                        <Fragment key={child.id}>
                          {getComponent(
                            child,
                            updatedName,
                            childIndex,
                            c.groupType === "list"
                          )}
                        </Fragment>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Collapse>
            )}
          </FormItemGroup>
        </Grid>
      );
    } else {
      const updatedName = skipJsonName
        ? initialName
        : initialName + "." + c.jsonName;
      switch (c.component) {
        default:
          return (
            <Grid item xs={12}>
              <TextInput
                label={c.label}
                name={updatedName}
                typographyProps={{}}
              />
            </Grid>
          );
      }
    }
  };
  return (
    <Grid container spacing={2}>
      {sections[activeSectionIndex].components.map((c, index) => {
        return (
          <Fragment key={c.id}>
            {getComponent(c, sections[activeSectionIndex].jsonName, index)}
          </Fragment>
        );
      })}
    </Grid>
  );
};
