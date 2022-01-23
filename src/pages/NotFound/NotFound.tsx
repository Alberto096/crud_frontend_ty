import React from "react";
import { useStyletron } from "baseui";
import { ToasterContainer } from "baseui/toast";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Grid, ALIGNMENT, Cell } from "baseui/layout-grid";
import useWindowSize from "../../utils/useWindowSize";
import { Link } from "react-router-dom";

function NotFound() {
  const [css, theme] = useStyletron();
  const size = useWindowSize();
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
                <FlexGridItem
                  className={css({ display: "contents" })}
                ></FlexGridItem>
              </FlexGrid>
              <div className={css({ background: "white", padding: "16px" })}>
                <section className="page_404">
                  <div className="container">
                    <div className="row">
                      <div
                        className={css({
                          textAlign: "center",
                          height: "10vh",
                          [theme.mediaQuery.medium]: {
                            height: "30vh",
                          },
                        })}
                      >
                        <div className="four_zero_four_bg">
                          <h1 className="text-center ">404</h1>
                        </div>
                        <div className="contant_box_404">
                          <h3 className="h2">
                            El contenido no esta disponible
                          </h3>
                          <Link to="/table">Regresar a la Lista</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    </ToasterContainer>
  );
}
export default NotFound;
