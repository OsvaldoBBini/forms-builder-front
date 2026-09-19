import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { XCircleIcon } from "lucide-react"
// import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import type { UseFormRegister } from "node_modules/react-hook-form/dist/types/form"
import type { FieldErrors } from "node_modules/react-hook-form/dist/types/errors"
import { Spinner } from "@/components/ui/spinner"

interface FormSaveInterface {
  open: boolean;
  onDialogStatus: () => void;
  onSaveForm: () => void;
  register: UseFormRegister<{ formName: string; }>
  errors: FieldErrors<{ formName: string; }>
  isPending: boolean;
}

export function FormSaveDialog({ 
  open,
  onDialogStatus,
  onSaveForm,
  register,
  errors,
  isPending
}: FormSaveInterface) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="min-w-sm">
        <form onSubmit={onSaveForm} className="space-y-4">
          
          <DialogHeader>
            <DialogTitle>Registrar Formulário</DialogTitle>
          </DialogHeader>
          
          <FieldGroup>
            <Field data-invalid={!!errors.formName}/>
            <Field>
              <Label 
                htmlFor="formName">
                  Nome do formulário
              </Label>
              <Input 
                id="formName" 
                {...register("formName")} 
                aria-invalid={!!errors.formName} 
              />
              {errors.formName?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.formName?.message}
                </FieldError>
              )}
            </Field>
            
            <Separator/>
            <DialogFooter>
              <Button onClick={(e) => {
                e.preventDefault();
                onDialogStatus();
              }} 
              variant="outline">Cancelar</Button>
              <Button type="submit">
                {isPending && <Spinner data-icon="inline-start"/>}
                Salvar
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
