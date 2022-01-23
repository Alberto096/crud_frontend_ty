import React, { useEffect, useState } from "react";
import { useStyletron } from "baseui";
import { Display4 } from "baseui/typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { FiMoreHorizontal } from "react-icons/fi";
import moment from "moment";
import useWindowSize from "../../../utils/useWindowSize";
import { ALIGNMENT, Cell, Grid } from "baseui/layout-grid";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ToasterContainer } from "baseui/toast";
import { URI_DOMAIN } from "../../../constants/constants";

const IngresoDataTable: React.FC = () => {
  const size = useWindowSize();
  const [css] = useStyletron();
  const [data, setData] = useState([]);
  const peticionGet = async () => {
    await axios
      .get(URI_DOMAIN)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        setData([]);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);

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
                  <Display4 marginBottom={"16px"}>Tabla de Recivos</Display4>
                </FlexGridItem>
                <FlexGridItem
                  className={css({ display: "contents" })}
                ></FlexGridItem>
              </FlexGrid>
              <TableBuilder
                data={data}
                overrides={{
                  Root: {
                    style: {
                      maxHeight: `${size.height - 220}px`,
                      textAlign: "center",
                    },
                  },
                  TableBodyRow: {
                    style: ({ $theme, $rowIndex }: any) => ({
                      backgroundColor:
                        $rowIndex % 2
                          ? $theme.colors.backgroundPrimary
                          : $theme.colors.backgroundSecondary,
                      ":hover": {
                        backgroundColor: $theme.colors.backgroundTertiary,
                      },
                    }),
                  },
                }}
              >
                <TableBuilderColumn
                  id="proveedor"
                  header="Provedor"
                  sortable
                  overrides={{
                    TableBodyCell: { style: { textAlign: "center" } },
                  }}
                >
                  {(row) => row?.proveedor}
                </TableBuilderColumn>
                <TableBuilderColumn id="monto" header="Monto" numeric sortable>
                  {(row) => row?.monto}
                </TableBuilderColumn>
                <TableBuilderColumn id="moneda" header="Moneda" sortable>
                  {(row) => row?.moneda}
                </TableBuilderColumn>
                <TableBuilderColumn header="Fecha">
                  {(row) => moment(row?.fecha).format("L")}
                </TableBuilderColumn>
                <TableBuilderColumn header="Fecha de Registro">
                  {(row) => moment(row?.fechaRegistro).format("L")}
                </TableBuilderColumn>
                <TableBuilderColumn
                  header="Ver mas"
                  overrides={{
                    TableHeadCellSortable: { style: { textAlign: "center" } },
                    TableBodyCell: { style: { textAlign: "center" } },
                  }}
                >
                  {(row) => (
                    <Link to={"table/" + row.id}>
                      <FiMoreHorizontal />
                    </Link>
                  )}
                </TableBuilderColumn>
              </TableBuilder>
            </div>
          </Cell>
        </Grid>
      </div>
    </ToasterContainer>
  );
};

export default IngresoDataTable;
