export interface JSONFormData {
  id: string;
  title: string;
  subheader?: string;
  apiRoute: string;
  method: "POST" | "PUT";
  sections: FormSection[];
}

export interface FormSection {
  id: string;
  title: string; //Group One
  jsonName: string; //groupOne
  components: (FormItem | FormGroup)[];
}

export interface CommonGroupProps {
  id: string;
  title: string;
  jsonName: string;
  componentType: "group";
}

export interface ObjectFormGroup extends CommonGroupProps {
  groupType: "list-object" | "object";
  components: (FormItem | ObjectFormGroup | PrimitiveFormGroup)[];
}
export interface PrimitiveFormGroup extends CommonGroupProps {
  groupType: "list";
  components: [FormItem];
}

export type FormGroup = ObjectFormGroup | PrimitiveFormGroup;

export interface CommonFormItemProps {
  id: string;
  label: string;
  componentType: "item";
  jsonName: string;
  disabled?: boolean;
}

export interface TextInputProps extends CommonFormItemProps {
  component: "textInput";
  type: "text" | "email" | "number" | "tel" | "url";
  value: string | number;
  placeholder?: string;
  lines?: number;
}

export interface RichTextInputProps extends CommonFormItemProps {
  component: "richTextInput";
  value: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends CommonFormItemProps {
  component: "select";
  value: string | string[];
  multiple: boolean;
  allowedValues: SelectOption[];
  placeholder?: string;
}

export interface FileProps extends CommonFormItemProps {
  component: "file";
  value: string;
  accept: "image/*" | "video/*";
}
export interface RatingProps extends CommonFormItemProps {
  component: "rating";
  value: number;
}

export interface DateProps extends CommonFormItemProps {
  component: "date";
  value: string | string[];
  range: boolean;
}

export interface TimeProps extends CommonFormItemProps {
  component: "time";
  value: string | string[];
  range: boolean;
}

export interface RadioProps extends CommonFormItemProps {
  component: "radio";
  value: string;
  allowedValues: string[];
}

export interface SwitchProps extends CommonFormItemProps {
  component: "switch";
  value: boolean;
}

export interface CheckboxProps extends CommonFormItemProps {
  component: "checkbox";
  value: string[];
  allowedValues: string[];
}

export type FormItem =
  | TextInputProps
  | RichTextInputProps
  | FileProps
  | SelectProps
  | RatingProps
  | DateProps
  | TimeProps
  | RadioProps
  | CheckboxProps
  | SwitchProps;
