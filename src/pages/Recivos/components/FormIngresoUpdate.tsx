import React, { useEffect, useState } from "react";
//Base Web
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { Display4 } from "baseui/typography";
import { toaster, ToasterContainer } from "baseui/toast";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Textarea } from "baseui/textarea";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { URI_DOMAIN } from "../../../constants/constants";

//types
type INullableReactText = React.ReactText | null;
type FormIngresosUpdateProps = {
  match: any;
};

const FormIngresoUpdate: React.FC<FormIngresosUpdateProps> = ({
  match,
}: FormIngresosUpdateProps) => {
  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale300 });
  const history = useHistory();


  const [proveedor, setProveedor] = useState("");
  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const [toastKey, setToastKey] = React.useState<INullableReactText>(null);

  const peticionGet = async () => {
    closeToast();
    await axios
      .get(URI_DOMAIN + "/" + match.params.id)
      .then((response) => {
        setProveedor(response?.data?.proveedor);
        setMonto(response?.data?.monto);
        setMoneda(response?.data?.moneda);
        setFecha(response?.data?.fechaRegistro);
        setComentario(response?.data?.comentario);
      })
      .catch((error) => {
        handleErrorIngresoCreate(error);
      });
  };

  const showToast = (message: string, toasttype: string) => {
    if (toasttype === "info") setToastKey(toaster.info(message, {}));
    if (toasttype === "negative") setToastKey(toaster.negative(message, {}));
  };
  const closeToast = () => {
    if (toastKey) {
      toaster.clear(toastKey);
      setToastKey(null);
    }
  };
  const handleErrorIngresoCreate = (err: any) => {
    showToast(err.message, "negative");
  };

  const hadleOnClickPanael = (event: any) => {
    event.preventDefault();
    history.push(`/table`);
};

  const handleOnSubmitForm = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    peticionGet();
  }, []);
  //view
  return (
    <ToasterContainer>
      <div
        className={css({
          background: "#5d5d5d",
          padding: "0",
          height: "100%",
          overflow: "hidden",
        })}
      >
        <Grid
          gridColumns={9}
          gridGaps={[2, 6, 12]}
          gridMaxWidth={1440}
          align={ALIGNMENT.start}
        >
          <Cell order={0} span={[9, 9, 9]}>
            <div className={css({ background: "white", padding: "16px" })}>
              <FlexGrid
                flexGridColumnCount={[2, 2, 2]}
                flexGridColumnGap="scale300"
              >
                <FlexGridItem>
                  <Display4 marginBottom={"16px"}>Recivos {proveedor}</Display4>
                </FlexGridItem>
                <FlexGridItem
                  className={css({ display: "contents" })}
                ></FlexGridItem>
              </FlexGrid>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <FormControl label="Proveedor">
                  <Input
                    disabled={true}
                    value={proveedor}
                    onChange={(event) =>
                      setProveedor(event.currentTarget.value)
                    }
                  />
                </FormControl>
                <FlexGrid
                  flexGridColumnCount={[1, 1, 2]}
                  flexGridColumnGap="scale300"
                >
                  <FlexGridItem>
                    <FormControl label="Monto">
                      <Input
                        disabled={true}
                        value={monto}
                        type="number"
                        onChange={(event) =>
                          setMonto(event.currentTarget.value)
                        }
                      />
                    </FormControl>
                  </FlexGridItem>
                  <FlexGridItem>
                    <FormControl label="Moneda">
                      <Input
                        disabled={true}
                        value={moneda}
                        onChange={(event) =>
                          setMoneda(event.currentTarget.value)
                        }
                      />
                    </FormControl>
                  </FlexGridItem>
                </FlexGrid>
                <FlexGrid
                  flexGridColumnCount={[1, 1, 2]}
                  flexGridColumnGap="scale300"
                >
                  <FlexGridItem>
                    <FormControl label="Fecha">
                      <Input
                        disabled={true}
                        value={fecha}
                        onChange={(event) =>
                          setFecha(event.currentTarget.value)
                        }
                        type="date"
                      />
                    </FormControl>
                  </FlexGridItem>
                </FlexGrid>
                <FormControl label="Comentario">
                  <Textarea
                    disabled={true}
                    value={comentario}
                    onChange={(event) =>
                      setComentario(event.currentTarget.value)
                    }
                  />
                </FormControl>

                <div className={css({ display: "flex" })}>
                  <Button
                    size={SIZE.compact}
                    onClick={handleOnSubmitForm}
                    disabled={true}
                  >
                    Guardar cambios
                  </Button>
                  <span className={space} />
                  <Button
                    kind={KIND.secondary}
                    size={SIZE.compact}
                    disabled={true}
                  >
                    Cancelar
                  </Button>
                  <span className={space} />
                  <Button
                    size={SIZE.compact}
                    onClick={hadleOnClickPanael}
                  >
                    Ver Tabla
                  </Button>
                  <span className={space} />
                </div>
              </form>
            </div>
          </Cell>
        </Grid>
      </div>
    </ToasterContainer>
  );
};
export default FormIngresoUpdate;
