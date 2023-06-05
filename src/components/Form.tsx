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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FormGroup, FormItem, JSONFormData } from "./types";
import { useFormik } from "formik";
import { FormBody } from "./form-body/FormBody";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "./hooks/useYupValidationResolver";
import * as yup from "yup";

interface Props {
  data: JSONFormData;
  onSubmit: (data: any) => void;
}

const FormContext = createContext<{ form: ReturnType<typeof useForm> }>({
  form: {} as any,
});

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
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

  const createYupComponentSchema = (
    schema: any,
    config: FormItem | FormGroup
  ) => {
    if (config.componentType === "item") {
      if (!config.validations || !config.validationType) return schema;

      const { jsonName, validationType, validations } = config;
      if (!yup[validationType]) return schema;

      //@ts-ignore
      let validator = yup[validationType]();
      validations.forEach(validation => {
        const { params, type } = validation;
        if (!validator[type]) {
          return;
        }
        validator = validator[type](...params);
      });
      schema[jsonName] = validator;
    }

    if (config.componentType === "group") {
      switch (config.groupType) {
        case "object":
          schema[config.jsonName] = yup
            .object()
            .shape(config.components.reduce(createYupComponentSchema, {}));
          break;
        case "list-object":
          schema[config.jsonName] = yup
            .array()
            .of(
              yup
                .object()
                .shape(config.components.reduce(createYupComponentSchema, {}))
            );
          break;
        default:
        // schema[config.jsonName] = yup
        //   .array()
        //   .of(
        //     yup
        //       .object()
        //       .shape(config.components.reduce(createYupComponentSchema, {}))
        //   );
      }
    }

    return schema;
  };

  const createYupSchema = () => {
    const schema = yup.object(
      data.sections.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.jsonName]: yup.object(
            curr.components.reduce(createYupComponentSchema, {})
          ),
        };
      }, {})
    );
    return schema;
  };

  const resolver = useYupValidationResolver(createYupSchema());
  const form = useForm({
    defaultValues: getInitialValueFromData(data),
    resolver,
  });

  console.log(form.formState.errors, "errorrr");

  return (
    <FormContext.Provider value={{ form }}>
      <form onSubmit={form.handleSubmit(data => console.log(data))}>
        <Card
          sx={{
            ".MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0.3,
            },
          }}>
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
