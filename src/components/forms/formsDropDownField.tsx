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


interface IFormsDropDownField {
  questionNumber: string;
  label: string;
  description?: string;
  options: { value: string }[]
  defaultValue?: string
}

export function FormsDropDownField({ 
  questionNumber, 
  label, 
  description, 
  options, 
  defaultValue }: IFormsDropDownField) {
    
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="align-item">{ questionNumber }. { label }</FieldLabel>
          {description && (
            <FieldDescription>
              {description}
            </FieldDescription>
          )}
        </FieldContent>
      </Field>
      <Field>
        <Select defaultValue={defaultValue}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position={"item-aligned"}
          >
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={crypto.randomUUID()} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  )
}
