import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import type { FormValues } from "./type";
import { Controller, type Control } from "react-hook-form";

interface IFormsCheckboxField {
  label: string;
  description?: string;
  options: { value: string, index: string }[]
  control?: Control<FormValues>;
  name?: `answers.${string}`;
  disabled: boolean
}

export function FormsCheckboxField({ label, description, options, control, name, disabled=false }: IFormsCheckboxField) {
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

      {name ? 
        <Controller 
          name={name}
          control={control}
          render={({field}) => {
            const selectedValues = Array.isArray(field.value) ? field.value : [];
            return <FieldGroup className="gap-3">
            {options.map((option) => 
              <Field orientation="horizontal" key={option.index}>
                <Checkbox
                  id={`${name}-${option.index}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={
                    (checked) => {
                      if (checked) { field.onChange([...selectedValues, option.value]); }
                      else { field.onChange(selectedValues.filter((value) => value !== option.value)); }
                    }
                  }
                  disabled={disabled}
                />
                <FieldLabel
                  className="font-normal"
                >
                  { option.value }
                </FieldLabel>
              </Field>
              )}
            </FieldGroup>
          }}  
        /> 
        :
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
      }

    </FieldSet>
  )
}
