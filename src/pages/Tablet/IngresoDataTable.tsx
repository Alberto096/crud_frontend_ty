import React, { useState } from "react";
//Base Web
import { Block } from "baseui/block";
import IngresoDataTable from "./components/IngresoDataTable";
import { useStyletron } from "baseui";

const Ingresos: React.FC = () => {
    const [css, theme] = useStyletron();
  return (
    <Block width={"100%"} backgroundColor={theme.colors.backgroundPrimary} flex={1}>
      <IngresoDataTable />
    </Block>
  );
};
export default Ingresos;
