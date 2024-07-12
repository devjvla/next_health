"use client"
import React from "react"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Form } from "react-hook-form"
import { FormFieldTypes } from "./forms/PatientForm"
import Image from "next/image"

// Phone Input
import "react-phone-number-input/style.css"
import PhoneInput, { type Value } from "react-phone-number-input"

type CustomFormFieldProps = {
  formControl: Control<any>;
  fieldType: FormFieldTypes;
  fieldName: string;
  fieldLabel?: string;
  fieldIconAlt?: string;
  fieldIconSrc?: string;
  fieldDateFormat?: string;
  fieldPlaceholder?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  isShowTimeSelect?: boolean;
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderInput = ({ field, props }: { field: any, props: CustomFormFieldProps}) => {
  const { fieldType, fieldIconSrc, fieldIconAlt, fieldPlaceholder, isFocused = false } = props;

  switch(fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {fieldIconSrc && (
            <Image src={fieldIconSrc} alt={fieldIconAlt || "alt_icon"} width={24} height={24} className="ml-2" />
          )}
          <FormControl>
            <Input {...field} className="shad-input border-0" placeholder={fieldPlaceholder} autoFocus={isFocused} />
          </FormControl>
        </div>
      )
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput 
            defaultCountry="PH"
            placeholder={fieldPlaceholder}
            international
            withCountryCallingCode 
            alue={field.value as Value | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )
    default:
      break;
  }
}

const CustomFormField = (props: CustomFormFieldProps) => {
  const { formControl, fieldType, fieldName, fieldLabel } = props;

  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && fieldLabel && (
            <FormLabel>{fieldLabel}</FormLabel>
          )}

          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;