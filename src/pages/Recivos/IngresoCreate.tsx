import React from "react";
//Base Web
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import FormIngresoCreate from "./components/FormIngresoCreate";

const IngresoCreate: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <Block backgroundColor={theme.colors.backgroundPrimary} flex={1} className={css({overflow: "hidden"})}>
      <FormIngresoCreate />
    </Block>
  );
};
export default IngresoCreate;
