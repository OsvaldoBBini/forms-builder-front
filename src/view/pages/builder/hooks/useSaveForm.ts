import { retriveToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import type { IField } from "./useFormBuilder";
import { useForm } from "react-hook-form";

const schema = z.object({
  formName: z.string()
    .min(1, 'O nome completo deve ter pelo menos uma letra')
    .max(100, 'O nome completo deve ter no máximo 100 letras'),
})

type FormData = z.infer<typeof schema>

const defaultValues = {
  formName: "",
}

interface IUseSaveFormProps {
  formId: string;
  fields: IField[];
}

export function useSaveForm({ formId, fields }: IUseSaveFormProps) {
  
  const {  handleSubmit: hookFormSubmit, register, reset, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      
      const formData = {
        formId: formId,
        formName: data.formName,
        fields: fields
      }

      const existingForms = localStorage.getItem('forms') ? JSON.parse(localStorage.getItem('forms') || '[]') : [];
      localStorage.setItem('forms', JSON.stringify([...existingForms, formData]));

      return retriveToast({
        toastType: "success",
        toastMessage: "Formulário salvo com sucesso"
      }) 
    }
    catch {
      return retriveToast({
        toastType: "error",
        toastMessage: "Erro ao salvar seu formulário. Tente novamente mais tarde"
      })
    } finally {
      reset(defaultValues)
    }
  });

  return {
    register, errors, handleSubmit
  }
  
}
