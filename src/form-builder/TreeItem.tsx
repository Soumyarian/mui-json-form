import React, { FC, ReactNode, useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import { FiChevronRight, FiChevronUp, FiDelete, FiEdit } from "react-icons/fi";

interface CommponProps {
  group: boolean;
  label: string;
  onSelect: () => void;
  selected: boolean;
}

interface GroupTypeProps extends CommponProps {
  group: true;
  children: ({ show }: { show: boolean }) => ReactNode;
}

interface ItemTypeProps extends CommponProps {
  group: false;
}

type Props = GroupTypeProps | ItemTypeProps;

const TreeItem: FC<Props> = ({ group, label, onSelect, selected, ...rest }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ListItem selected={selected}>
        {group && (
          <ListItemIcon>
            <IconButton size="small" onClick={() => setShow(p => !p)}>
              {show ? <FiChevronUp /> : <FiChevronRight />}
            </IconButton>
          </ListItemIcon>
        )}
        <ListItemText
          primary={label}
          onClick={onSelect}
          sx={{ cursor: "pointer" }}
        />
      </ListItem>
      {/* @ts-ignore */}
      {group ? rest.children({ show }) : null}
    </>
  );
};

export default TreeItem;
