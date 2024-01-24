import * as React from "react";
import { IMaskInput } from "react-imask";
import Input from "@mui/material/Input";

import styles from "./page.module.css";
import { useFormContext } from "react-hook-form";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export function CellphoneInput({ registerField }) {
  const { register } = useFormContext();

  return (
    <Input
      name="telefone"
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
      className={styles.inputs}
      {...register(registerField)}
    />
  );
}
