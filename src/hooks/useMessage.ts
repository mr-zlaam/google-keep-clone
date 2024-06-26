import { toast } from "sonner";

export const useMessage = () => {
  const successMessage = (message: string) => {
    toast.success(message, {
      duration: 1500,
      className: "text-green-800",
      position: "top-center",
    });
  };
  const errorMessage = (message: string) => {
    toast.error(message, {
      duration: 3000,
      className: "text-red-600 select-none",
      position: "top-center",
    });
  };
  return { successMessage, errorMessage };
};
