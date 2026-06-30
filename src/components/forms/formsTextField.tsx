import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input";

interface IFormsTextArea {
  questionNumber: string;
  label: string;
  size: "small" | "large"
}

export function FormsTextField({ questionNumber ,label, size }: IFormsTextArea) {
  return(
    <Field>
      <FieldLabel>
        {questionNumber}. {label}
      </FieldLabel>
      {
        size === "small" &&
        <Input
          required
        />
      }
      {
        size === "large" &&
        <Textarea
          className="resize-none"
        />
      }
    </Field>
  )
}
