import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea"

interface IFormsLongTextField {
  description?: string;
  label: string;
}

export function FormsLongTextField({ label, description }: IFormsLongTextField) {
  return(
    <Field>
      <FieldLabel>
        {label}
      </FieldLabel>
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
        <Textarea
          className="resize-none"
        />
    </Field>
  )
}
