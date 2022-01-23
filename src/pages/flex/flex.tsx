import React, { useEffect, useMemo, useState } from "react";
import { useStyletron } from "baseui";
import { Display4, LabelSmall } from "baseui/typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { FiMoreHorizontal } from "react-icons/fi";
import moment from "moment";

const IngresoDataTable: React.FC = () => {
  const baseUrl = "https://localhost:44315/api/Recivos";
  const [css, theme] = useStyletron();
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState("bar");
  const [sortAsc, setSortAsc] = useState(true);
  const overrides = {
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
  };
  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
      });
  };

  const sortedData = useMemo(() => {
    return data.slice().sort((a: any, b: any) => {
      const left = sortAsc ? a : b;
      const right = sortAsc ? b : a;
      const leftValue = String(left[sortColumn]);
      const rightValue = String(right[sortColumn]);
      return leftValue.localeCompare(rightValue, "en", {
        numeric: true,
        sensitivity: "base",
      });
    });
  }, [sortColumn, sortAsc, data]);
  function handleSort(id: string) {
    if (id === sortColumn) {
      setSortAsc((asc) => !asc);
    } else {
      setSortColumn(id);
      setSortAsc(true);
    }
  }

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div
      className={css({
        background: theme.colors.backgroundSecondary,
        padding: "16px",
        margin: "0px",
        [theme.mediaQuery.medium]: {
          marginLeft: "16px",
          marginRight: "16px",
        },
      })}
    >
      <Display4 marginBottom={"16px"}>Recivos</Display4>
      <div>
        <TableBuilder
          data={data}
          overrides={overrides}
          sortColumn={sortColumn}
          sortOrder={sortAsc ? "ASC" : "DESC"}
          onSort={handleSort}
        >
          <TableBuilderColumn id="proveedor" header="Provedor" sortable overrides={{ TableBodyCell:{ style: { textAlign: "center"} } }}>
            {(row) => row?.proveedor}
          </TableBuilderColumn>
          <TableBuilderColumn id="monto" header="Monto" numeric sortable>
            {(row) => row?.monto}
          </TableBuilderColumn>
          <TableBuilderColumn id="moneda" header="Moneda" sortable>
            {(row) => row?.moneda}
          </TableBuilderColumn>
          <TableBuilderColumn header="Fecha">
            {(row) => moment(row?.fecha).format('L')}
          </TableBuilderColumn>
          <TableBuilderColumn header="Fecha de Registro">
            {(row) => moment(row?.fechaRegistro).format('L')}
          </TableBuilderColumn>
          <TableBuilderColumn header="Ver mas" overrides={{ TableHeadCellSortable:{ style:{ textAlign:"center"} }, TableBodyCell:{ style: { textAlign: "center"} } }}>
            {(row) => (
              <Link to={"/"+ row.id}>
                <FiMoreHorizontal />
              </Link>
            )}
          </TableBuilderColumn>
        </TableBuilder>
      </div>
    </div>
  );
};

export default IngresoDataTable;
