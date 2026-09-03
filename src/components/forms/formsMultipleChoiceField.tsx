import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IFormsMultipleChoiceField {
  label: string;
  description?: string;
  options: { value: string, index: string }[]
}

export function FormsMultipleChoiceField({ label, description, options}: IFormsMultipleChoiceField) {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">{ label }</FieldLegend>
      { description && <FieldDescription>{ description }</FieldDescription> }
      <RadioGroup defaultValue="monthly">
        {
          options.map(( option ) => 
            <Field orientation="horizontal" key={option.index}>
              <RadioGroupItem value={ option.value }/>
              <FieldLabel className="font-normal">
                { option.value }
              </FieldLabel>
            </Field>
          )
        }
      </RadioGroup>
    </FieldSet>
  )
}
