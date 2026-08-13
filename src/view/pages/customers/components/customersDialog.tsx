import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { XCircleIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { retriveToast } from "@/utils/toaster"
import { Spinner } from "@/components/ui/spinner"
import type { INewCustomer } from "@/app/services/customersServices/createCustomers"
import { customersServices } from "@/app/services/customersServices"
import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { useEffect } from "react"

interface CompanyDialogInterface {
  companyId: string;
  customer?: ICustomer;
  open: boolean;
  onDialogStatus: () => void;
  onEmptyCustomer: () => void;
}

const schema = z.object({
  fullName: z.string()
    .min(1, 'O nome completo deve ter pelo menos uma letra')
    .max(100, 'O nome completo deve ter no máximo 100 letras'),
  email: z.email('Formato de email inválido').optional(),
  cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, 'Formato de CPF inválido'),
  phoneNumber: z.string().regex(/^(?:\(?([1-9]{2})\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/, 'Formato de número de telefone inválido')
})

type FormData = z.infer<typeof schema>

const defaultValues = {
  fullName: "",
  email: "",
  cpf: "",
  phoneNumber: ""
}

export function CustomersDialog({ 
  companyId,
  customer,
  open,
  onDialogStatus,
  onEmptyCustomer
}: CompanyDialogInterface) {

  const queryClient = useQueryClient();
  
  const { 
    handleSubmit: hookFormSubmit, register, reset, formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  useEffect(() => {
    reset({
      fullName: customer?.fullName ?? "",
      email: customer?.email ?? "",
      cpf: customer?.cpf ?? "",
      phoneNumber: customer?.phoneNumber ?? ""
    })
  }, [customer, reset])

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createCustomer"],
    mutationFn: async (data: INewCustomer) => { return customersServices.createCustomers(companyId, { ...data }) }
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    await mutateAsync(data).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getCustomers'],
      });

      return retriveToast({
        toastType: "success",
        toastMessage: "Cliente cadastrado com sucesso"
      }) 
    }
    ).catch(() => {
      return retriveToast({
        toastType: "error",
        toastMessage: "Erro ao cadastrar seu cliente. Tente novamente mais tarde"
      })
    })
    reset(defaultValues)
    onDialogStatus();
    onEmptyCustomer();
  });

  const handleClose = () => {
    reset(defaultValues)
    onDialogStatus() 
    onEmptyCustomer()
  };

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="min-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <DialogHeader>
            <DialogTitle>{ customer ? "Editar Cliente" : "Cadastrar Cliente" }</DialogTitle>
            <DialogDescription>
              {customer ? "Edite os dados do cliente" : "Insira os dados do cliente"}
            </DialogDescription>
          </DialogHeader>
          
          <FieldGroup>
            <Field data-invalid={!!errors.fullName}>
              <Label 
                htmlFor="fullName">
                  Nome completo
              </Label>
              <Input 
                id="fullName" 
                {...register("fullName")} 
                aria-invalid={!!errors.fullName} 
              />
              {errors.fullName?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.fullName?.message}
                </FieldError>
              )}
            </Field>
            
            <Field data-invalid={!!errors.email}>
              <Label 
                htmlFor="email">
                  E-mail
              </Label>
              <Input 
                id="email" 
                {...register("email")} 
                placeholder="exemplo@gmail.com"
                aria-invalid={!!errors.email} 
              />
              {errors.email?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.email?.message}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.phoneNumber}>
              <Label 
                htmlFor="phoneNumber">
                  Número de telefone
              </Label>
              <Input 
                id="phoneNumber" 
                {...register("phoneNumber")} 
                placeholder="55999999999"
                aria-invalid={!!errors.phoneNumber} 
              />
              {errors.phoneNumber?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.phoneNumber?.message}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.cpf}>
              <Label 
                htmlFor="cpf">
                  CPF
              </Label>
              <Input 
                id="cpf" 
                {...register("cpf")} 
                aria-invalid={!!errors.cpf} 
                placeholder="09099909099"
              />
              {errors.cpf?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.cpf?.message}
                </FieldError>
              )}
            </Field>

            <DialogFooter className="mt-4">
              <Button onClick={(e) => {
                e.preventDefault();
                handleClose()
              }} 
              variant="outline">Cancelar</Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner data-icon="inline-start"/>}
                {customer ? "Atualizar" : "Cadastrar"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
