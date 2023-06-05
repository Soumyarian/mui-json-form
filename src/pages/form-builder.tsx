import React, { useState, createContext, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@mui/material";

import { JSONForm } from "@/components";
import { formData } from "@/components/data/product-json-form";
import FormTreeview from "@/form-builder/FormTreeview";
import produce from "immer";
import { JSONFormData } from "@/components/types";
import { Stack } from "@mui/system";
import { FiDelete, FiEdit, FiPlus } from "react-icons/fi";

const BuilderContext = createContext<{
  activePosition: number[];
  selectNode: (value: number[]) => void;
  data: JSONFormData;
}>({
  activePosition: [],
  selectNode: () => {},
  data: {} as any,
});

const FormBuilder = () => {
  const [data, setData] = useState(formData);
  const [activePosition, setActivePosition] = useState<number[]>([]);

  const findNode = (data: JSONFormData, position: number[]) => {
    if (position.length === 1) return data.sections[position[0]];
    let node: any = null;
    for (let i = 0; i <= position.length - 1; i++) {
      if (i === 0) node = data.sections[position[i]];
      else node = node.components[position[i]];
    }
    return node;
  };

  const deleteNode = () => {
    setData(
      produce(d => {
        if (activePosition.length === 1) {
          d.sections.splice(activePosition[0], 1);
        } else {
          const parent = findNode(
            d,
            activePosition.slice(0, activePosition.length - 1)
          );
          if (parent)
            parent.components.splice(
              activePosition[activePosition.length - 1],
              1
            );
        }
      })
    );
  };

  const selectNode = (position: number[]) => setActivePosition(position);

  return (
    <BuilderContext.Provider value={{ activePosition, selectNode, data }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="Components" />
              <CardContent>
                <Stack gap={2}>
                  <Stack direction="row" gap={1}>
                    <IconButton>
                      <FiPlus />
                    </IconButton>
                    <IconButton>
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={deleteNode}
                      disabled={activePosition.length === 0}>
                      <FiDelete />
                    </IconButton>
                  </Stack>
                  <FormTreeview />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <JSONForm data={data} onSubmit={() => {}} />
          </Grid>
        </Grid>
      </Container>
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => useContext(BuilderContext);

export default FormBuilder;
