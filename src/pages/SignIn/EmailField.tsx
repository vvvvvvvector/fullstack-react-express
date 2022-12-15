import { TextField } from "@mui/material";

import { useField, FieldAttributes } from "formik";

const EmailField: React.FC<FieldAttributes<{}>> = ({ ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  // {...field} -> name, onChange, onBlur properites
  return (
    <TextField
      sx={{
        position: "relative",
        width: "100%",
        marginBottom: "20px",
      }}
      {...field}
      type="text"
      label="Your email"
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};

export default EmailField;
