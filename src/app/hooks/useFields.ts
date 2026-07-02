import { FormsCheckboxField } from "@/components/forms/formsCheckboxField";
import { FormsDropDownField } from "@/components/forms/formsDropDownField";
import { FormsLongTextField } from "@/components/forms/formsLongTextField";
import { FormsMultipleChoiceField } from "@/components/forms/formsMultipleChoiceField";
import { FormsShortTextField } from "@/components/forms/formsShorttextField";


export function useFields() {

  const fieldTypes = {
    shortAnswer: FormsShortTextField,
    longAnswer: FormsLongTextField,
    radioSelection: FormsMultipleChoiceField,
    checkbox: FormsCheckboxField,
    selectField: FormsDropDownField
  };

  const retrieveField = ( fieldType: string ) => fieldTypes[fieldType as keyof typeof fieldTypes];

  return { retrieveField };
}
