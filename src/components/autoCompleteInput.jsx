import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const persons = [
  {
    id: 1,
    nome: "Carlos Silva Lima",
  },
  {
    id: 2,
    nome: "Carlito Ramos Junior",
  },
  {
    id: 3,
    nome: "Paulo Felipe Castro",
  },
];

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function AutoCompleteInput({ registerField }) {
  const { register, setValue, control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = useState(undefined);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);
      if (active && inputValue) {
        setOptions([...persons]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      name={registerField}
      control={control}
      render={({ field }) => (
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.nome}
          options={options}
          loading={loading}
          onChange={(_, value) => {
            setValue(registerField, value);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asynchronous"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
