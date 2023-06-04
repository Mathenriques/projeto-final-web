import { Role } from '@prisma/client'

export function validateCrmCorenFormat(crmCoren: string, role: Role) {
  const regexCOREN = /^COREN-[A-Z]{2}\d{3}-\d{3}-[A-Z]{3}$/
  const regexCRM = /^CRM\/[A-Z]{2} \d{6}$/

  if (role === 'ENFERMEIRO') {
    return regexCOREN.test(crmCoren)
  }

  if (role === 'MEDICO_GERAL' || role === 'MEDICO_UTI') {
    return regexCRM.test(crmCoren)
  }
}
