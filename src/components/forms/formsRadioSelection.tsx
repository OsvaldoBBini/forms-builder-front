import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IFormsRadioSelection {
  questionNumber: string;
  label: string;
  descriptions?: string;
  options: { label: string, value: string }[]
}

export function FormsRadioSelection({ questionNumber, label, descriptions, options}: IFormsRadioSelection) {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">{ questionNumber }. { label }</FieldLegend>
      { descriptions && <FieldDescription>{ descriptions }</FieldDescription>}
      <RadioGroup defaultValue="monthly">
        {
          options.map(( option ) => 
            <Field orientation="horizontal">
              <RadioGroupItem value={ option.value }/>
              <FieldLabel className="font-normal">
                { option.label }
              </FieldLabel>
            </Field>
          )
        }
      </RadioGroup>
    </FieldSet>
  )
}
