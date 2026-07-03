import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea"

interface IFormsLongTextField {
  questionNumber: string;
  description?: string;
  label: string;
}

export function FormsLongTextField({ questionNumber , label, description }: IFormsLongTextField) {
  return(
    <Field>
      <FieldLabel>
        {questionNumber}. {label}
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
