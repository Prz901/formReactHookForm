import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

import styles from "../app/page.module.css";

export function InputText({ placeholder, registerField, errors }) {
  const { register } = useFormContext();

  return (
    <>
      <TextField
        required
        id="outlined-required"
        label={registerField}
        defaultValue=""
        placeholder={placeholder}
        className={styles.inputs}
        {...register(registerField)}
      />
    </>
  );
}
