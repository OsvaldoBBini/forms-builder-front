import { FormsCheckboxField } from "@/components/forms/formsCheckboxField";
import { FormsDropDownField } from "@/components/forms/formsDropDownField";
import { FormsLongTextField } from "@/components/forms/formsLongTextField";
import { FormsRadioField } from "@/components/forms/formsRadioField";
import { FormsShortTextField } from "@/components/forms/formsShortTextField";


export function useFields() {

  const fieldTypes = {
    shortAnswer: FormsShortTextField,
    longAnswer: FormsLongTextField,
    radioSelection: FormsRadioField,
    checkbox: FormsCheckboxField,
    selectField: FormsDropDownField
  };

  const retrieveField = ( fieldType: string ) => fieldTypes[fieldType as keyof typeof fieldTypes];

  return { retrieveField };
}
