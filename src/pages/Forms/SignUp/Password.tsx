import { useState } from "react";

import { TextField } from "@mui/material";

import { useField, FieldAttributes } from "formik";

export const Password: React.FC<{ label: string } & FieldAttributes<{}>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      sx={{
        position: "relative",
        width: "100%",
        marginBottom: "20px",
      }}
      {...field}
      type={"password"}
      label={label}
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};
