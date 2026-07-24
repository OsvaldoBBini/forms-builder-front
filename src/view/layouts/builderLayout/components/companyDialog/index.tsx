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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { XCircleIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateCompanyParams } from "@/app/services/companyServices/createCompany"
import { companyServices } from "@/app/services/companyServices"
import { retriveToast } from "@/utils/toaster"
import { Spinner } from "@/components/ui/spinner"

interface CompanyDialogInterface {
  title: string;
  description: string;
  canSetDefault?: boolean;
  canClose?: boolean;
  open: boolean;
  onDialogStatus?: (status: boolean) => void;
}

const schema = z.object({
  companyName: z.string()
    .min(1, 'O nome da empresa deve ter pelo menos uma letra')
    .max(30, 'O nome da empresa deve ter no máximo 30 letras'),
  isDefault: z.boolean()
})

type FormData = z.infer<typeof schema>

export function CompanyDialog({ 
  title,
  description,
  canSetDefault = false, 
  canClose = false, 
  open,
  onDialogStatus
}: CompanyDialogInterface) {

  const queryClient = useQueryClient();
  
  const { 
    handleSubmit: hookFormSubmit, register, control, formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { companyName: "", isDefault: true }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createCompany"],
    mutationFn: async (data: CreateCompanyParams) => { return companyServices.createCompany({ ...data }) }
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    await mutateAsync(data).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getCompanies'],
      });

      return retriveToast({
        toastType: "success",
        toastMessage: "Empresa cadastrada com sucesso"
      }) 
    }
    ).catch(() => {
      return retriveToast({
        toastType: "error",
        toastMessage: "Erro ao cadastrar sua empresa. Tente novamento mais tarde"
      })
    })
    if (onDialogStatus) onDialogStatus(false);
  });

  const handleClose = () => {
    if (onDialogStatus) onDialogStatus(false) 
  };

  return (
    <Dialog open={open}>
      <DialogContent className="min-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          
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

            {canSetDefault && (
              <>
                <FieldSeparator className="w-full" />
                <FieldSet>
                  <FieldLegend>Definir como empresa padrão</FieldLegend>
                  <FieldDescription>
                    A empresa será definida como padrão. Essa configuração poderá ser alterada posteriormente.
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

            <DialogFooter className="mt-4">
              {canClose && <Button onClick={handleClose} variant="outline">Cancelar</Button>}
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                Cadastrar
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
