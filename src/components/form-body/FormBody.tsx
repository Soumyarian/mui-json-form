import React, { FC, Fragment } from "react";
import { Grid, CardContent, Collapse } from "@mui/material";
import { FormGroup, FormItem, FormSection } from "../types";
import { TextInput, Select, FileInput } from "../form-fields";
import { FormItemGroup } from "./FormItemGroup";
import FormListGroupTabs from "./FormListGroupTabs";

interface Props {
  sections: FormSection[];
  activeSectionIndex: number;
}

export const FormBody: FC<Props> = ({ sections, activeSectionIndex }) => {
  const getComponent = (
    c: FormItem | FormGroup,
    initialName: string,
    skipJsonName = false
  ) => {
    if (c.componentType === "group") {
      return (
        <Grid item xs={12}>
          <FormItemGroup title={c.title}>
            {({ show }) => (
              <Collapse in={show}>
                <CardContent>
                  {c.groupType === "list-object" ? (
                    <FormListGroupTabs
                      name={`${initialName}.${c.jsonName}`}
                      getComponent={getComponent}
                      groupSchema={c}
                    />
                  ) : (
                    <Grid container spacing={2}>
                      {c.components.map((child, childIndex) => {
                        let updatedName = `${initialName}.${c.jsonName}`;
                        if (c.groupType !== "object") {
                          updatedName += `.${childIndex}`;
                        }
                        return (
                          <Fragment key={child.id}>
                            {getComponent(
                              child,
                              updatedName,
                              c.groupType === "list"
                            )}
                          </Fragment>
                        );
                      })}
                    </Grid>
                  )}
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
      let colspan = { xs: 12 };
      if (c.colspan) {
        colspan = { ...colspan, ...c.colspan };
      }
      const getFormItem = () => {
        switch (c.component) {
          case "select":
            return (
              <Select
                label={c.label}
                name={updatedName}
                options={c.allowedValues}
                disabled={c.disabled}
                multiple={c.multiple}
              />
            );
          case "file":
            return (
              <FileInput
                label={c.label}
                name={updatedName}
                accept={c.accept}
                disabled={c.disabled}
              />
            );
          default:
            return (
              <TextInput
                label={c.label}
                name={updatedName}
                typographyProps={{}}
              />
            );
        }
      };
      return (
        <Grid item {...colspan}>
          {getFormItem()}
        </Grid>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      {sections[activeSectionIndex].components.map((c, index) => {
        return (
          <Fragment key={c.id}>
            {getComponent(c, sections[activeSectionIndex].jsonName)}
          </Fragment>
        );
      })}
    </Grid>
  );
};
