import React, { useState } from "react";
//Base Web
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import FormIngresoUpdate from "./components/FormIngresoUpdate";

type UpdateIngesosProps = {
    match: any;
};

const Ingresos: React.FC<UpdateIngesosProps> = ({ match }: UpdateIngesosProps) => {
    const [css, theme] = useStyletron();
  return (
    <Block backgroundColor={theme.colors.backgroundPrimary} flex={1} className={css({overflow: "hidden"})}>
      <FormIngresoUpdate match={match} />
    </Block>
  );
};
export default Ingresos;
