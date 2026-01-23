import { Messages } from "@/common/constants";
import { z } from "zod";

const defaultMessage = Messages.FIELD_REQUIRED; // This field is required

export function zodEmailRequired(message: string = defaultMessage) {
  return z
  .email({ 
    message: message,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   })


    // .refine(
    //   (email) => {
    //     const domain = email.split("@")[1];
    //     return allowedDomains.includes(domain as string);
    //   },
    //   {
    //     message: allowedDomainsMessage,
    //   },
    // );
}
