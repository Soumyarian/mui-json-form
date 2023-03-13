import { JSONForm } from "@/components";
import { JSONFormData } from "@/components/types";
import { Container, AppBar, Toolbar } from "@mui/material";
import { nanoid } from "nanoid";

export default function Home() {
  const formData: JSONFormData = {
    id: nanoid(),
    title: "Form",
    subheader: "Basic Form Demo",
    apiRoute: "",
    method: "POST",
    sections: [
      {
        id: nanoid(),
        jsonName: "section1",
        title: "Section 1",
        components: [
          {
            id: nanoid(),
            componentType: "item",
            label: "Name",
            jsonName: "name",
            component: "textInput",
            type: "text",
            value: "",
            placeholder: "Enter Your Name",
          },
          {
            id: nanoid(),
            componentType: "group",
            title: "Contact Info",
            groupType: "object",
            jsonName: "contactInfo",
            components: [
              {
                id: nanoid(),
                componentType: "item",
                label: "Email",
                jsonName: "email",
                component: "textInput",
                type: "email",
                value: "",
                placeholder: "Enter Your Email",
              },
              {
                id: nanoid(),
                componentType: "item",
                label: "Phone Number",
                jsonName: "phoneNumber",
                component: "textInput",
                type: "number",
                value: "",
                placeholder: "Enter Your Phone Number",
              },
            ],
          },
        ],
      },
      {
        id: nanoid(),
        jsonName: "section2",
        title: "Section 2",
        components: [
          {
            id: nanoid(),
            componentType: "group",
            title: "Subjects",
            groupType: "list-object",
            jsonName: "subjects",
            components: [
              {
                id: nanoid(),
                componentType: "group",
                title: "Addtional Sub",
                groupType: "object",
                jsonName: "assSub",
                components: [
                  {
                    id: nanoid(),
                    componentType: "item",
                    label: "Name",
                    jsonName: "name",
                    component: "textInput",
                    type: "text",
                    value: "",
                    placeholder: "Enter Your Email",
                  },
                ],
              },
              {
                id: nanoid(),
                componentType: "item",
                label: "Name",
                jsonName: "name",
                component: "textInput",
                type: "text",
                value: "",
                placeholder: "Enter Your Email",
              },
              {
                id: nanoid(),
                componentType: "item",
                label: "Teacher",
                jsonName: "teacher",
                component: "select",
                value: "",
                multiple: false,
                allowedValues: [
                  { label: "John", value: "1" },
                  { label: "Maria", value: "2" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: nanoid(),
        jsonName: "section3",
        title: "Section 3",
        components: [
          {
            id: nanoid(),
            componentType: "group",
            title: "Keywords",
            groupType: "list",
            jsonName: "keywords",
            components: [
              {
                id: nanoid(),
                componentType: "item",
                label: "Keyword",
                jsonName: "keyword",
                component: "textInput",
                type: "text",
                value: "",
                placeholder: "Enter Your Email",
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <>
      <AppBar>
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Container sx={{ py: 3 }} maxWidth="md">
        <JSONForm data={formData} onSubmit={() => {}} />
      </Container>
    </>
  );
}
