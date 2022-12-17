import { TextField } from "@mui/material";

import { useField, FieldAttributes } from "formik";

export const Email: React.FC<FieldAttributes<{}>> = ({ ...props }) => {
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
      type="text"
      label="Email address"
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};
