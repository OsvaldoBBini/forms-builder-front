import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

interface IFormsCheckboxField {
  questionNumber: string;
  label: string;
  description?: string;
  options: { value: string }[]
}

export function FormsCheckboxField({ questionNumber, label, description, options }: IFormsCheckboxField) {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        {questionNumber}. {label}
      </FieldLegend>
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
      <FieldGroup className="gap-3">
        {options.map((option) => 
        <Field orientation="horizontal" key={crypto.randomUUID()}>
          <Checkbox/>
          <FieldLabel
            className="font-normal"
          >
            { option.value }
          </FieldLabel>
        </Field>
        )}
      </FieldGroup>
    </FieldSet>
  )
}
