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
  label: string;
  description?: string;
  options: { value: string, index: string }[]
}

export function FormsCheckboxField({ label, description, options }: IFormsCheckboxField) {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        {label}
      </FieldLegend>
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
      <FieldGroup className="gap-3">
        {options.map((option) => 
        <Field orientation="horizontal" key={option.index}>
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
