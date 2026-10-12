import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea"
import type { FormValues } from "./type";
import type { UseFormRegister } from "react-hook-form";

interface IFormsLongTextField {
  description?: string;
  label: string;
  name?: `answers.${string}`,
  register?: UseFormRegister<FormValues>;
  disabled: boolean
}

export function FormsLongTextField({ label, description, name, register, disabled=false }: IFormsLongTextField) {
  return(
    <Field>
      <FieldLabel>
        {label}
      </FieldLabel>
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
        <Textarea
          {...(register && name && register(name))}
          required
          disabled={disabled}
          className="resize-none"
        />
    </Field>
  )
}
