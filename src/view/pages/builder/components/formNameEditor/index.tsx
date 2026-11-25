import { getForms, type IForm } from "@/app/services/formsServices/getForms";
import { formsServices } from "@/app/services/formsServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { triggerToast } from "@/utils/toaster";
import {
  FORM_NAME_MAX_LENGTH,
  isValidFormName,
} from "@/utils/formNameValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Pencil, X } from "lucide-react";
import { useState } from "react";

interface FormNameEditorProps {
  companyId: string;
  formId: string;
}

export function FormNameEditor({ companyId, formId }: FormNameEditorProps) {
  const queryClient = useQueryClient();
  const queryKey = ["getForms", companyId];
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");

  const { data: forms } = useQuery({
    queryKey,
    queryFn: () => getForms(companyId),
    enabled: Boolean(companyId && formId),
  });
  const form = forms?.find((item) => item.formId === formId);

  const { mutateAsync: saveName, isPending } = useMutation({
    mutationKey: ["updateFormName", companyId, formId],
    mutationFn: (formName: string) =>
      formsServices.updateFormName(companyId, { formId, formName }),
    onSuccess: (updatedFormId, formName) => {
      queryClient.setQueryData<IForm[]>(queryKey, (previousForms) =>
        previousForms?.map((item) =>
          item.formId === updatedFormId ? { ...item, formName } : item
        )
      );
    },
  });

  if (!form) return null;

  const handleCancel = () => {
    setDraftName(form.formName);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const formName = draftName.trim();
    if (!isValidFormName(formName) || formName === form.formName) return;

    try {
      await saveName(formName);
      setIsEditing(false);
      triggerToast({
        toastType: "success",
        toastMessage: "Nome do formulário atualizado com sucesso",
      });
    } catch {
      triggerToast({
        toastType: "error",
        toastMessage: "Erro ao atualizar o nome. Tente novamente mais tarde",
      });
    }
  };

  return (
    <header className="flex min-h-9 items-center gap-2 pb-1">
      {isEditing ? (
        <div className="flex w-full max-w-xl items-start gap-2">
          <div className="min-w-0 flex-1">
            <Input
              autoFocus
              aria-label="Nome do formulário"
              maxLength={FORM_NAME_MAX_LENGTH}
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            aria-label="Salvar nome do formulário"
            disabled={
              isPending ||
              !isValidFormName(draftName) ||
              draftName.trim() === form.formName
            }
            onClick={() => void handleSave()}
          >
            {isPending ? <Spinner /> : <CheckCircle aria-hidden="true" />}
          </Button>
          <Button
            type="button"
            variant="destructive"
            aria-label="Cancelar edição do nome"
            disabled={isPending}
            onClick={handleCancel}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <>
          <h1 className="truncate">{form.formName}</h1>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Editar nome do formulário"
            onClick={() => {
              setDraftName(form.formName);
              setIsEditing(true);
            }}
          >
            <Pencil aria-hidden="true" />
          </Button>
        </>
      )}
    </header>
  );
}
