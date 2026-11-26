export function onlyDigits(value: string) {
  return value.replace(/\D/g, "")
}

export function formatCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11)

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
}

export function formatCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14)

  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})/, "$1.$2.$3/$4-$5")
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11)

  if (digits.length >= 10) {
    const areaCode = digits.slice(0, 2)
    const subscriber = digits.slice(2)
    const prefixLength = digits.length === 11 ? 5 : 4
    const prefix = subscriber.slice(0, prefixLength)
    const suffix = subscriber.slice(prefixLength)

    return `(${areaCode}) ${prefix}${suffix ? `-${suffix}` : ""}`
  }

  if (digits.length === 9) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`
  }

  if (digits.length > 4) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  }

  return digits
}
