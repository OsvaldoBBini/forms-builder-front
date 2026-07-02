import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface IFormsShortTextField {
  questionNumber: string;
  label: string;
}

export function FormsShortTextField({ questionNumber ,label }: IFormsShortTextField) {
  return(
    <Field>
      <FieldLabel>
        {questionNumber}. {label}
      </FieldLabel>
        <Input
          required
        />
    </Field>
  )
}
