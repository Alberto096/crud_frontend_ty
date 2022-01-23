import React, { useState } from "react";
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
import useWindowSize from "../../../utils/useWindowSize";
import { useHistory } from "react-router-dom";
import { URI_DOMAIN } from "../../../constants/constants";

//types
type INullableReactText = React.ReactText | null;

const FormIngresoCreate: React.FC = () => {
  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale300 });
  const size = useWindowSize();
  const history = useHistory();

  const [proveedor, setProveedor] = useState("");
  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const [successfullysaved, setsuccessfullysaved] = React.useState(false);
  const [toastKey, setToastKey] = React.useState<INullableReactText>(null);
  const showToast = (message: string, toasttype: string) => {
    if (toasttype === "info") setToastKey(toaster.info(message, {}));
    if (toasttype === "negative") setToastKey(toaster.negative(message, {}));
  };

  const peticionPost = async () => {
    closeToast();
    await axios
      .post(URI_DOMAIN, {
        proveedor: proveedor,
        monto: Number(monto),
        moneda: moneda,
        comentario: comentario,
        fecha: fecha,
        fechaRegistro: new Date(),
      })
      .then((response) => {
        showToast("Se ha guardado correctamente", "info");
        setsuccessfullysaved(true);
      })
      .catch((error) => {
        handleErrorIngresoCreate(error);
      });
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
    peticionPost();
  };
  //view
  return (
    <ToasterContainer>
      <div
        className={css({
          background: "#5d5d5d",
          padding: "0",
          height: `${size.height - 64}px`,
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
                  <Display4 marginBottom={"16px"}>Nuevo Ingreso</Display4>
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
                    maxLength={150}
                    value={comentario}
                    onChange={(event) =>
                      setComentario(event.currentTarget.value)
                    }
                  />
                </FormControl>

                <div className={css({ display: "flex" })}>
                  <Button size={SIZE.compact} onClick={handleOnSubmitForm} disabled={successfullysaved}>
                    Guardar cambios
                  </Button>
                  <span className={space} />
                  <Button kind={KIND.secondary} size={SIZE.compact} disabled={successfullysaved}>
                    Cancelar
                  </Button>
                  <span className={space} />
                  <Button
                    size={SIZE.compact}
                    disabled={!successfullysaved}
                    onClick={hadleOnClickPanael}
                  >
                    Ver Tabla
                  </Button>
                </div>
              </form>
            </div>
          </Cell>
        </Grid>
      </div>
    </ToasterContainer>
  );
};
export default FormIngresoCreate;
