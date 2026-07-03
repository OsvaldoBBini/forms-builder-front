import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface IFormsShortTextField {
  questionNumber: string;
  description?: string;
  label: string;
}

export function FormsShortTextField({ questionNumber ,label, description }: IFormsShortTextField) {
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
      <Input
        required
      />
    </Field>
  )
}
