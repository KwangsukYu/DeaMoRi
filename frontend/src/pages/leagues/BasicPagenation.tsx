import * as React from "react";
import "./BasicPagenation.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        variant="text"
        color="primary"
        sx={{ color: "white" }}
      />
    </Stack>
  );
}
