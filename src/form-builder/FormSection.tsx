import React, { FC, Fragment, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import { FiChevronRight, FiChevronUp, FiDelete, FiEdit } from "react-icons/fi";
import { FormGroup, FormItem, FormSection } from "@/components/types";
import TreeItem from "./TreeItem";
import { arrayEquals } from "./utils";
import { useBuilderContext } from "@/pages/form-builder";

interface Props {
  section: FormSection;
  index: number;
}

const FormSection: FC<Props> = ({ section, index }) => {
  const [show, setShow] = useState(false);
  const { activePosition, selectNode } = useBuilderContext();

  const handleComponentSelect = (position: number[]) =>
    selectNode([index, ...position]);

  const getComponents = (c: FormGroup | FormItem, position: number[]) => {
    if (c.componentType === "group") {
      return (
        <TreeItem
          group={true}
          label={c.title}
          onSelect={() => handleComponentSelect(position)}
          selected={arrayEquals(activePosition, [index, ...position])}>
          {({ show }) => {
            return (
              <Collapse in={show} unmountOnExit sx={{ px: 2 }}>
                <List disablePadding dense key={c.id}>
                  {c.components.map((c, index) => (
                    <Fragment key={c.id}>
                      {getComponents(c, [...position, index])}
                    </Fragment>
                  ))}
                </List>
              </Collapse>
            );
          }}
        </TreeItem>
      );
    }
    return (
      <TreeItem
        group={false}
        label={c.label}
        onSelect={() => handleComponentSelect(position)}
        selected={arrayEquals(activePosition, [index, ...position])}
      />
    );
  };

  return (
    <>
      <ListItem disableGutters selected={arrayEquals(activePosition, [index])}>
        <ListItemIcon>
          <IconButton size="small" onClick={() => setShow(p => !p)}>
            {show ? <FiChevronUp /> : <FiChevronRight />}
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={section.title}
          onClick={() => selectNode([index])}
          sx={{ cursor: "pointer" }}
        />
      </ListItem>
      <Collapse in={show} unmountOnExit>
        <List disablePadding dense>
          {section.components.map((c, index) => (
            <Fragment key={c.id}>{getComponents(c, [index])}</Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default FormSection;
