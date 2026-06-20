import { toast, type ToasterProps } from "sonner";


interface IRetriveTost {
  toastType: "error" | "success" | "warning",
  toastMessage: string
  toastProps?: ToasterProps
}

export function retriveToast({ toastType, toastMessage, toastProps }: IRetriveTost) {

  const factory = {
    error: toast.error,
    success: toast.success,
    warning: toast.warning
  }

  return factory[toastType](toastMessage, { position: "bottom-center", ...toastProps })
}
