import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IFormsMultipleChoiceField {
  questionNumber: string;
  label: string;
  description?: string;
  options: { value: string }[]
}

export function FormsMultipleChoiceField({ questionNumber, label, description, options}: IFormsMultipleChoiceField) {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">{ questionNumber }. { label }</FieldLegend>
      { description && <FieldDescription>{ description }</FieldDescription> }
      <RadioGroup defaultValue="monthly">
        {
          options.map(( option ) => 
            <Field orientation="horizontal" key={crypto.randomUUID()}>
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
