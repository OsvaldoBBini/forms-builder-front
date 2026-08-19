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
import { XCircleIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { useCustomersDialog } from "./useCustomersDialog"

interface CompanyDialogInterface {
  companyId: string;
  customer?: ICustomer;
  open: boolean;
  onDialogStatus: () => void;
  onEmptyCustomer: () => void;
}

export function CustomersDialog({ 
  companyId,
  customer,
  open,
  onDialogStatus,
  onEmptyCustomer
}: CompanyDialogInterface) {

  const { handleSubmit, register, errors, handleClose, isPending } = useCustomersDialog({
    companyId,
    customer,
    onDialogStatus,
    onEmptyCustomer
  })

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
