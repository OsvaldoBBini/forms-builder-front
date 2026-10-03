import { toast, type ToasterProps } from "sonner";


interface ITriggerTost {
  toastType: "error" | "success" | "warning",
  toastMessage: string
  toastProps?: ToasterProps
}

export function triggerToast({ toastType, toastMessage, toastProps }: ITriggerTost) {

  const factory = {
    error: toast.error,
    success: toast.success,
    warning: toast.warning
  }

  return factory[toastType](toastMessage, { position: "bottom-center", ...toastProps })
}
