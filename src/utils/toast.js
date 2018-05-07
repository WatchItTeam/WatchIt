import { toast } from "react-toastify";

export function successToast(text) {
  toast(text, {
    className: "toast-success",
    progressClassName: "toast-progress-bar",
  });
}

export function errorToast(text) {
  toast.error(text, {
    autoClose: 5000,
  });
}
