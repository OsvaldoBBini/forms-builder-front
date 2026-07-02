import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
  label: z.string().min(1, 'Texto inválido'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ITextFieldModal {
  isOpen: boolean;
  onClose?: () => void;
  onAddField: (field: { label: string; description?: string; fieldType: string }) => void;
}

export function TextFieldModal({ isOpen, onClose, onAddField }: ITextFieldModal) {

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
    });

  const handleSubmit = hookFormSubmit(
    (data) => { 
      console.log("Form data:", data);
      onAddField({ label: data.label, description: data.description, fieldType: "shortAnswer" });
    },
    (errors) => {
    console.error("Validation failed. Errors:", errors);
  }
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Criar campo de texto</DialogTitle>
          </DialogHeader>
          <form id="text-field-form" onSubmit={handleSubmit}>
            <FieldGroup>
            <Field>
              <Label htmlFor="label">Pergunta</Label>
              <Input id="label" {...register("label")} 
              aria-invalid={!!errors.label} />
            </Field>
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" {...register("description")} 
              aria-invalid={!!errors.description} />
            </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild onClick={onClose}>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" form="text-field-form">
              Adicionar campo
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
