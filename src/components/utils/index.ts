import { useFormik } from "formik";
import { FormGroup, FormItem } from "../types";

export const getGroupDataFromName = (
  formik: ReturnType<typeof useFormik>,
  name: string
) => {
  const jsonNames = name.split(".");
  let group = formik.values;
  jsonNames.forEach(j => {
    group = group[j];
  });
  return group;
};

export const getComponentJson = (components: (FormItem | FormGroup)[]): any => {
  return components.reduce((acc, curr) => {
    const getValue = () => {
      if (curr.componentType === "item") return curr.value;
      if (curr.groupType === "object") return getComponentJson(curr.components);
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

export const titleCaseToCamelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
