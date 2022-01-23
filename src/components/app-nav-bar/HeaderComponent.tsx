import React from "react";
//Base Web
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Avatar } from "baseui/avatar";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { ChevronDown } from "baseui/icon";

const HeaderComponent: React.FC = () => {
  const [css, theme] = useStyletron();
  const ITEMS = [{ label: "Editar" }];
  return (
    <div
      className={css({
        background: "#FFFFFF",
      })}
    >
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>Recivos</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <StyledLink href="/">Nuevo Ingreso</StyledLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StyledLink href="/table">Lista de Ingreso</StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <StatefulPopover
              focusLock
              placement={PLACEMENT.bottomLeft}
              content={({ close }) => (
                <StatefulMenu
                  items={ITEMS}
                  onItemSelect={() => close()}
                  overrides={{
                    List: { style: { height: "150px", width: "138px" } },
                  }}
                />
              )}
            >
              <Button kind={KIND.minimal} endEnhancer={() => <ChevronDown size={24} />}>
                <Avatar
                  name={`user`}
                  size={"scale800"}
                  src={`https://avatars.dicebear.com/api/human/scale800.svg?width=285&mood=happy`}
                  key={"scale800"}
                />
              </Button>
            </StatefulPopover>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </div>
  );
};

export default HeaderComponent;
