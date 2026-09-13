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
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"

interface FormSaveInterface {
  formId: string;
  open: boolean;
  onDialogStatus: () => void;
}

export function FormSaveDialog({ 
  formId,
  open,
  onDialogStatus
}: FormSaveInterface) {

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="min-w-sm">
        <form onSubmit={() => console.log} className="space-y-4">
          
          <DialogHeader>
            <DialogTitle>Registrar Formulário</DialogTitle>
          </DialogHeader>
          
          <FieldGroup>
            {/* <Field data-invalid={!!errors.fullName}> */}
            <Field>
              <Label 
                htmlFor="formsName">
                  Nome do formulário
              </Label>
              <Input 
                id="formsName" 
                // {...register("formsName")} 
                // aria-invalid={!!errors.formsName} 
              />
              {/* {errors.fullName?.message && (
                <FieldError className="text-red-600 flex items-center gap-x-1"> 
                  <XCircleIcon size={10}/>
                  {errors.fullName?.message}
                </FieldError>
              )} */}
            </Field>
            
            <Separator/>
            <DialogFooter>
              <Button onClick={(e) => {
                e.preventDefault();
                // handleClose()
              }} 
              variant="outline">Cancelar</Button>
              <Button type="submit">
                {/* {isPending && <Spinner data-icon="inline-start"/>} */}
                Salvar
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
