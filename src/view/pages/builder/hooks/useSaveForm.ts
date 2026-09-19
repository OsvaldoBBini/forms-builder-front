import { retriveToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import type { IField } from "./useFormBuilder";
import { useForm } from "react-hook-form";
import { formatDate } from "@/utils/formatDate";
import { useMutation } from "@tanstack/react-query";
import type { IForm } from "@/app/services/formsServices/createForms";
import { formsServices } from "@/app/services/formsServices";


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
  companyId: string;
}

export function useSaveForm({ formId, fields, companyId }: IUseSaveFormProps) {

  const {  handleSubmit: hookFormSubmit, register, reset, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues
  });

  const { mutateAsync: createForm, isPending: isCreating } = useMutation({
    mutationKey: ["createForm"],
    mutationFn: async (data: IForm) => { return formsServices.createForms(companyId, data) }
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      
      const formData = {
        formId: formId,
        formName: data.formName,
        fields: fields,
        createdAt: formatDate(new Date()),
        lastUpdate: formatDate(new Date()),
      }

      await createForm(formData);

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
    register, errors, handleSubmit, isCreating
  }
  
}
