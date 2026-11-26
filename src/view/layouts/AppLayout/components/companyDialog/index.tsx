import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { XCircleIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateCompanyParams } from "@/app/services/companyServices/createCompany"
import { companyServices } from "@/app/services/companyServices"
import { triggerToast } from "@/utils/toaster"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import type { ICompany } from "@/app/services/companyServices/getCompanies"
import type { UpdateCompanyParams } from "@/app/services/companyServices/updateCompany"
import { useEffect, useMemo } from "react"
import { formatCnpj, onlyDigits } from "@/utils/formatDocuments"

interface CompanyDialogInterface {
  title: string;
  description: string;
  canSetDefault?: boolean;
  canClose?: boolean;
  open: boolean;
  companyToUpdate: ICompany | null;
  onDialogStatus?: (status: boolean) => void;
  onCompanyChange?: (company: ICompany) => void;
}

const schema = z.object({
  companyName: z.string()
    .min(1, 'O nome da empresa deve ter pelo menos uma letra')
    .max(30, 'O nome da empresa deve ter no máximo 30 letras'),
  cnpj: z.string().regex(/^\d{14}$/, { message: 'Cnpj deve conter 14 dígitos.' }),
  isDefault: z.boolean()
})

type FormData = z.infer<typeof schema>

export function CompanyDialog({ 
  title,
  description,
  canSetDefault = false, 
  canClose = false, 
  open,
  companyToUpdate,
  onDialogStatus,
  onCompanyChange
}: CompanyDialogInterface) {

  const queryClient = useQueryClient();

  const defaultValues = useMemo(() => ({ 
    companyName: "",
    cnpj: "",
    isDefault: false
  }), [])
  
  const { 
    handleSubmit: hookFormSubmit, reset, register, control, formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:  defaultValues
  });

  useEffect(() => {
    reset(
      companyToUpdate
        ? {
          companyName: companyToUpdate.companyName,
          cnpj: companyToUpdate.cnpj,
          isDefault: companyToUpdate.isDefault
        }
      : defaultValues
    )
  }, [companyToUpdate, defaultValues, open, reset])

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createCompany"],
    mutationFn: async (data: CreateCompanyParams) => { return companyServices.createCompany({ ...data }) }
  });

  const { mutateAsync: updateCompany, isPending: isPendingCompanyUpdate } = useMutation({
    mutationKey: ["updateCompany"],
    mutationFn: async (data: UpdateCompanyParams) => 
      { return companyServices.updateCompany({ ...data }) }
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      const savedCompany = companyToUpdate
        ? await updateCompany({ ...data, companyId: companyToUpdate.companyId })
        : await mutateAsync(data);

      onCompanyChange?.(savedCompany);
      triggerToast({
        toastType: "success",
        toastMessage: companyToUpdate
          ? "Empresa atualizada com sucesso"
          : "Empresa cadastrada com sucesso"
      });

      await queryClient.invalidateQueries({ queryKey: ["getCompanies"] });
      onDialogStatus?.(false);
    }
    catch {
      triggerToast({
        toastType: "error",
        toastMessage: "Erro ao salvar a empresa. Tente novamente mais tarde"
      })
    }
  });

  const handleClose = () => {
    if (onDialogStatus) onDialogStatus(false) 
  };

  const isLoading = isPending || isPendingCompanyUpdate

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="min-w-sm p-0">
        <form onSubmit={handleSubmit} className="space-y-4 p-4" id="company-form">
          
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <FieldGroup>
            <Field data-invalid={!!errors.companyName}>
              <Label 
                htmlFor="companyName">
                  Nome da empresa
              </Label>
              <Input 
                id="companyName" 
                {...register("companyName")} 
                aria-invalid={!!errors.companyName} 
              />
              {errors.companyName?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.companyName?.message}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.cnpj}>
              <Label 
                htmlFor="cnpj">
                  Cnpj
              </Label>
              <Controller
                control={control}
                name="cnpj"
                render={({ field }) => (
                  <Input
                    id="cnpj"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={formatCnpj(field.value)}
                    onChange={(event) => field.onChange(onlyDigits(event.target.value).slice(0, 14))}
                    placeholder="00.000.000/0000-00"
                    aria-invalid={!!errors.cnpj}
                  />
                )}
              />
              {errors.cnpj?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.cnpj?.message}
                </FieldError>
              )}
            </Field>

            {canSetDefault && (
              <>
                <FieldSeparator className="w-full" />
                <FieldSet className="gap-4">
                  <FieldTitle>Definir como padrão</FieldTitle>
                  <FieldDescription>
                    Esta empresa será selecionada por padrão ao iniciar o sistema. Você poderá alterar essa configuração posteriormente
                  </FieldDescription>
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <Controller
                        control={control}
                        name="isDefault"
                        render={({ field }) => (
                          <Checkbox
                            id="isDefault"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <FieldLabel
                        htmlFor="isDefault"
                        className="font-normal cursor-pointer"
                      >
                        Definir como padrão
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </>
            )}

          </FieldGroup>
        </form>
        
        <Separator/>

        <DialogFooter className="p-2">
          {canClose && <Button disabled={isLoading} onClick={(e) => {
            e.preventDefault();
            handleClose()
          }} 
          variant="destructive">Cancelar</Button>}
          <Button type="submit" disabled={isLoading} form="company-form">
            {isLoading && <Spinner data-icon="inline-start"/>}
            {companyToUpdate ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
