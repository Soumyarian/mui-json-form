import { useBuilderContext } from "@/pages/form-builder";
import { List } from "@mui/material";
import React, { FC } from "react";
import FormSection from "./FormSection";
import { arrayEquals } from "./utils";

const FormTreeview: FC = () => {
  const { data, activePosition } = useBuilderContext();
  return (
    <List dense disablePadding>
      {data.sections.map((s, index) => {
        return <FormSection key={s.id} index={index} section={s} />;
      })}
    </List>
  );
};

export default FormTreeview;
