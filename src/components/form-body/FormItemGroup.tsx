import { Card, CardHeader, Grid, IconButton } from "@mui/material";
import { ReactNode, FC, useState } from "react";
import { FiArrowDown, FiArrowUp, FiPlus } from "react-icons/fi";

interface Props {
  title: string;
  children: ({ show }: { show: boolean }) => ReactNode | ReactNode[];
}

export const FormItemGroup: FC<Props> = ({ children, title }) => {
  const [show, setShow] = useState(true);
  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardHeader
          title={title}
          titleTypographyProps={{
            fontWeight: 500,
            textTransform: "uppercase",
          }}
          avatar={
            <IconButton size="small" onClick={() => setShow(p => !p)}>
              {show ? <FiArrowUp /> : <FiArrowDown />}
            </IconButton>
          }
        />
        {children({ show })}
      </Card>
    </Grid>
  );
};
