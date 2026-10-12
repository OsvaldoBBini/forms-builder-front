import type { UseFormRegister } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { FormValues } from "./type";

interface IFormsShortTextField {
  description?: string;
  label: string;
  name?: `answers.${string}`;
  register?: UseFormRegister<FormValues>;
  disabled: boolean
}

export function FormsShortTextField({ label, description, name, register, disabled = false}: IFormsShortTextField) {
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
      <Input {...(register && name && register(name))}
        required
        disabled={disabled}
      />
    </Field>
  )
}
