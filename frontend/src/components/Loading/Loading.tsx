import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "../../pages/university/UniList.scss";

export default function Loading() {
  return (
    <div className="uni-list-total-background-err">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
