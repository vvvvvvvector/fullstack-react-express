import { useState } from "react";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useField, FieldAttributes } from "formik";

const PasswordField: React.FC<FieldAttributes<{}>> = ({ ...props }) => {
  const [field, meta] = useField(props);

  const [passwordVisible, setPasswordVisible] = useState(false);

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
      type={passwordVisible ? "text" : "password"}
      label="Your password"
      helperText={errorText}
      error={errorText !== ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
