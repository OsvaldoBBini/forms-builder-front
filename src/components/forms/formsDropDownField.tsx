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
  label: string;
  description?: string;
  options: { value: string, index: string }[]
}

export function FormsDropDownField({ 
  label, 
  description, 
  options, 
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
      </Field>
    </FieldGroup>
  )
}
