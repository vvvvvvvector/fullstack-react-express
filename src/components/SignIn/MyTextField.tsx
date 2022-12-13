import { TextField } from "@mui/material";

import { useField, FieldAttributes } from "formik";

import { CustomTextField } from "../../common/types";

const MyTextField: React.FC<CustomTextField & FieldAttributes<{}>> = ({
  type,
  label,
  ...props
}) => {
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
      type={type}
      label={label}
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};

export default MyTextField;
