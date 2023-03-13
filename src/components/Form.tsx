import { FC, useState, createContext, useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FormGroup, FormItem, JSONFormData } from "./types";
import { useFormik } from "formik";
import { FormBody } from "./form-body/FormBody";

interface Props {
  data: JSONFormData;
  onSubmit: (data: any) => void;
}

const FormContext = createContext<{ formik: ReturnType<typeof useFormik> }>({
  formik: {} as any,
});

export const JSONForm: FC<Props> = ({ data }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getComponentJson = (components: (FormItem | FormGroup)[]): any => {
    return components.reduce((acc, curr) => {
      const getValue = () => {
        if (curr.componentType === "item") return curr.value;
        if (curr.groupType === "object")
          return getComponentJson(curr.components);
        if (curr.groupType === "list-object")
          return [getComponentJson(curr.components)];
        if (curr.groupType === "list") return [curr.components[0].value];
      };
      return {
        ...acc,
        [curr.jsonName]: getValue(),
      };
    }, {} as any);
  };

  const getInitialValueFromData = (data: JSONFormData) => {
    return data.sections.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.jsonName]: getComponentJson(curr.components),
      }),
      {} as any
    );
  };

  const formik = useFormik({
    initialValues: getInitialValueFromData(data),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <FormContext.Provider value={{ formik }}>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader title={data.title} subheader={data.subheader} />
          <CardContent>
            <Stack gap={3}>
              <Tabs
                sx={{ bgcolor: grey[50] }}
                value={value}
                onChange={handleChange}>
                {data.sections.map(s => (
                  <Tab label={s.title} key={s.id} />
                ))}
              </Tabs>
              <FormBody activeSectionIndex={value} sections={data.sections} />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button>Reset</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </CardActions>
        </Card>
      </form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
