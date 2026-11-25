import { triggerToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import type { IField } from "./useFormBuilder";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { IForm } from "@/app/services/formsServices/createForms";
import { formsServices } from "@/app/services/formsServices";
import type { IFields } from "@/app/services/formsServices/updateFields";
import { useCallback } from "react";
import {
  FORM_NAME_MAX_LENGTH,
  FORM_NAME_MIN_LENGTH,
} from "@/utils/formNameValidation";

const schema = z.object({
  formName: z.string()
    .trim()
    .min(FORM_NAME_MIN_LENGTH, `O nome do formulário deve ter pelo menos ${FORM_NAME_MIN_LENGTH} caracteres`)
    .max(FORM_NAME_MAX_LENGTH, `O nome do formulário deve ter no máximo ${FORM_NAME_MAX_LENGTH} caracteres`),
})

type FormData = z.infer<typeof schema>

const defaultValues = {
  formName: "",
}

interface IUseSaveFormProps {
  formId?: string;
  fields: IField[];
  companyId: string;
}

export function useSaveForm({ formId, fields, companyId }: IUseSaveFormProps) {

  const { handleSubmit: hookFormSubmit, register, reset, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues
  });

  const { mutateAsync: createForm, isPending: isCreating } = useMutation({
    mutationKey: ["createForm"],
    mutationFn: async (data: IForm) => { return formsServices.createForms(companyId, data) }
  });

  const { mutateAsync: updateFields, isPending: isUpdatingFields } = useMutation({
    mutationKey: ["updateFields"],
    mutationFn: async (data: IFields) => { return formsServices.updateFields(companyId, data) }
  });

  const handleUpdateFields = useCallback(async () => {
    if (!formId) return;

    try {
      await updateFields({formId, fields});
      triggerToast({
        toastType: "success",
        toastMessage: "Campos atualizados com sucesso",
        toastProps: { position: "top-center" }
      });
    } catch {
      triggerToast({
        toastType: "error",
        toastMessage: "Erro ao atualizar os campos. Tente novamente mais tarde",
        toastProps: { position: "top-center" }
      });
    }
  }, [fields, formId, updateFields]);

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      const formData = {
        formId: formId || crypto.randomUUID(),
        formName: data.formName,
        fields: fields,
        createdAt: new Date().toISOString(),
      };

      await createForm(formData);

      triggerToast({
        toastType: "success",
        toastMessage: "Formulário salvo com sucesso"
      });

      reset(defaultValues);
    } catch {
      triggerToast({
        toastType: "error",
        toastMessage: "Erro ao salvar seu formulário. Tente novamente mais tarde"
      });

      throw new Error("Failed to save form");
    }
  });

  return {
    register, errors, handleSubmit, isCreating, handleUpdateFields, isUpdatingFields
  }
  
}
