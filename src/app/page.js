'use client'

import styles from "./page.module.css";

import Button from '@mui/material/Button';

import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { AutoCompleteInput } from '../components/autoCompleteInput';
import { InputText } from '../components/inputText';
import { CellphoneInput } from '../components/inputCellphone';

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  telefone: z.string().min(11, { message: 'Telefone é obrigatorio' }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  pessoa: z.object({
    id: z.number(),
    nome: z.string()
  })
})

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(validationSchema)
  })


  const onSubmit = (data) => {
    const pessoa = data.pessoa.id
    const telefone = data.telefone
    const email = data.email
    console.log({
      pessoa,
      telefone,
      email
    })
  }

  return (
    <main className={styles.main}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.containerForm}>
          <AutoCompleteInput registerField={"pessoa"} />
          <CellphoneInput placeholder={'Digite um telefone'} registerField={"telefone"} />
          <InputText placeholder={'Digite um email'} registerField={"email"} errors={methods.errors} />

          <Button type="submit" variant="contained">Enviar</Button>
        </form>
      </FormProvider>

    </main>
  );
}
