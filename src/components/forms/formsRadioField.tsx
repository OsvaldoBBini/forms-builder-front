import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormValues } from "./type";
import { Controller, type Control } from "react-hook-form";

interface IFormsRadioField {
  label: string;
  description?: string;
  options: { value: string, index: string }[];
  control?: Control<FormValues>;
  name?: `answers.${string}`;
  disabled: boolean
}

export function FormsRadioField({ label, description, options, name, control, disabled=false}: IFormsRadioField) {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">{ label }</FieldLegend>
      { description && <FieldDescription>{ description }</FieldDescription> }
      {name ? 
      
        <Controller 
          name={name} 
          control={control} render={({field}) => (
          
          <RadioGroup 
            value={typeof field.value === "string" ? field.value : ""}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
          >
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
          
        )}/> 
        
        :

        <RadioGroup>
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
      }
    </FieldSet>
  )
}
