import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormValues } from "./type";
import { Controller, type Control } from "react-hook-form";


interface IFormsDropDownField {
  label: string;
  description?: string;
  options: { value: string, index: string }[];
  control?: Control<FormValues>;
  name?: `answers.${string}`;
  disabled: boolean
}

export function FormsDropDownField({ 
  label, 
  description, 
  options, 
  name,
  control,
  disabled=false
  }: IFormsDropDownField) {
    
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="align-item">{ label }</FieldLabel>
          {description && (
            <FieldDescription>
              {description}
            </FieldDescription>
          )}
        </FieldContent>
      </Field>
      <Field>
        {name ? 

          <Controller
            name={name ? name : `answers._`} 
            control={control} render={({field}) => (
              <Select
                value={typeof field.value === "string" ? field.value : ""}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position={"item-aligned"}
                >
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option.index} value={option.value}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          /> 
          :
          <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position={"item-aligned"}
              >
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.index} value={option.value}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
      }
      </Field>
    </FieldGroup>
  )
}
