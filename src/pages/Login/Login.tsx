import React, { useState } from "react";
//Base Web
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Notification, KIND } from "baseui/notification";
import { DeleteAlt } from "baseui/icon";

//Contenido

//notificacion

import { expandBorderStyles } from "baseui/styles";
import Cookies from "universal-cookie";
import axios from "axios";
import { URI_DOMAIN } from "../../constants/constants";

//funcion para dibujar un componente basado en funciones - puede estar en otro archivo
function NotificationMsg(errormsg: string) {
  return (
    <Notification
      kind={KIND.warning}
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            ...expandBorderStyles($theme.borders.border600),
            width: "92%",
          }),
        },
        CloseIcon: {
          component: DeleteAlt as React.FC<any>,
          style: { float: "right", cursor: "pointer" },
        },
      }}
    >
      {errormsg}
    </Notification>
  );
}



const Login: React.FC = () => {
  const [css, theme] = useStyletron();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setError] = useState("");
  const cookies = new Cookies();
  //JS
  const inputEl = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const input2 = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const _handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      input2.current?.focus();
    }
  };

  return (
    <section
      className={css({
        backgroundColor: theme.colors.backgroundLightWarning,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      })}
    >
      <Block>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await axios
              .get(URI_DOMAIN + `/${email}/${password}`)
              .then((response) => {
                cookies.set('accessToken', response?.data?.id)
                window.location.reload();
              })
              .catch((error) => {
                setError(error);
              });
          }}
        >
          <Card
            overrides={{
              Root: {
                style: {
                  left: "50%",
                  maxWidth: "420px",
                  maxHeight: "500px",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "95vw",
                  textAlign: "center",
                },
              },
            }}
          >
            <StyledBody>
              {errormsg ? NotificationMsg(errormsg) : null}
              <Block
                className={css({
                  textAlign: "left",
                })}
              >
                <FormControl label="Correo electrónico">
                  <Input
                    id="user-id"
                    value={email}
                    type="email"
                    inputRef={inputEl}
                    onChange={onChange}
                    onKeyDown={_handleKeyDown}
                  />
                </FormControl>

                <FormControl label="Contraseña">
                  <Input
                    id="password-id"
                    type="password"
                    value={password}
                    inputRef={input2}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </FormControl>
              </Block>
            </StyledBody>

            <StyledAction>
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      marginTop: "16px",
                      marginBottom: "8px",
                      width: "100%",
                    },
                  },
                }}
              >
                Iniciar sesión
              </Button>
            </StyledAction>
          </Card>
        </form>
      </Block>
    </section>
  );
};
export default Login;
