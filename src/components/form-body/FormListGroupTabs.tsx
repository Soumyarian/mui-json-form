import { Grid, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useState, FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useFormContext } from "../Form";
import { FormGroup } from "../types";
import { getComponentJson } from "../utils";

interface Props {
  name: string;
  getComponent: any;
  groupSchema: FormGroup;
}

const FormListGroupTabs: FC<Props> = ({ name, groupSchema, getComponent }) => {
  const { form } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control: form.control, name }
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_: any, newValue: string) =>
    setActiveTab(Number(newValue));

  return (
    <Stack gap={4}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={activeTab}
          onChange={handleChange}>
          {fields.map((f, index) => (
            <Tab key={f.id} label={`Group ${index + 1}`} />
          ))}
        </Tabs>
        <IconButton
          onClick={() => append(getComponentJson(groupSchema.components))}>
          <FiPlus />
        </IconButton>
      </Stack>
      {fields.map((f, index) => {
        if (activeTab !== index) return null;
        return (
          <Grid container spacing={2} key={f.id}>
            {groupSchema.components.map(child => {
              return (
                <Fragment key={child.id}>
                  {getComponent(child, `${name}.${index}`, false)}
                </Fragment>
              );
            })}
          </Grid>
        );
      })}
    </Stack>
  );
};

export default FormListGroupTabs;
