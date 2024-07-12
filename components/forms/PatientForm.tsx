"use client"
 
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"

// Zod
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserFormValidation } from "@/lib/validation"

// Custom Components
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useRouter } from "next/navigation"

export enum FormFieldTypes {
  INPUT       = "input",
  SELECT      = "select",
  CHECKBOX    = "checkbox",
  TEXTAREA    = "textarea",
  SKELETON    = "skeleton",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
}
 
const PatientForm = () => {
  const router = useRouter();
  let [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({ fullName, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      // const userData = { fullName, email, phone };
      // const user     = await createUser(userData);

      // if(user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there! 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          formControl={form.control}
          fieldName="fullName"
          fieldLabel="Full Name"
          fieldPlaceholder="Enter your full name"
          fieldIconSrc="/assets/icons/user.svg"
          fieldIconAlt="user-icon"
          isFocused={true} 
        />
        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          formControl={form.control}
          fieldName="email"
          fieldLabel="Email Address"
          fieldPlaceholder="Enter your email address"
          fieldIconSrc="/assets/icons/email.svg"
          fieldIconAlt="email-icon"
        />
        <CustomFormField
          fieldType={FormFieldTypes.PHONE_INPUT}
          formControl={form.control}
          fieldName="phone"
          fieldLabel="Phone Number"
          fieldPlaceholder="Enter your phone number"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm