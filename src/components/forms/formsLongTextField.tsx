import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea"

interface IFormsLongTextField {
  questionNumber: string;
  label: string;
}

export function FormsLongTextField({ questionNumber ,label }: IFormsLongTextField) {
  return(
    <Field>
      <FieldLabel>
        {questionNumber}. {label}
      </FieldLabel>
        <Textarea
          className="resize-none"
        />
    </Field>
  )
}
