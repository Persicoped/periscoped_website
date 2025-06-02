"use server"

import { z } from "zod"
import { sendContactEmail } from "@/lib/email-service"

const partnershipInquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().min(2, { message: "Company name is required." }),
  disruption_goal: z
    .string()
    .min(10, { message: "Please briefly describe your market disruption goal (min 10 characters)." }),
})

export interface PartnershipFormState {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    disruption_goal?: string[]
  }
}

export async function submitPartnershipInquiry(
  prevState: PartnershipFormState,
  formData: FormData,
): Promise<PartnershipFormState> {
  const validatedFields = partnershipInquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    disruption_goal: formData.get("disruption_goal"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Send email using Gmail API
  const emailSent = await sendContactEmail({
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    company: validatedFields.data.company,
    message: validatedFields.data.disruption_goal,
  })

  if (!emailSent) {
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact us directly.",
    }
  }

  return {
    success: true,
    message: "Thank you for your inquiry! We'll contact you shortly to discuss a strategic partnership.",
  }
}
