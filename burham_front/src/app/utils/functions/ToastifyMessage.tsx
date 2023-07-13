import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifyMessage = (type: string, text: string, ms: number) => {
    const option = String(type.toLowerCase());
    switch (option) {
      case "error":
        toast.error(text,
          {
            position: "top-center", autoClose: ms, hideProgressBar: false, closeOnClick: true, 
            pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
          }
        );
        break;
        case "success":
          toast.success(text,
            {
              position: "top-center", autoClose: ms, hideProgressBar: false, closeOnClick: true, 
              pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
            }
          );
          break;
          case "info":
              toast.info(text,
                {
                  position: "top-center", autoClose: ms, hideProgressBar: false, closeOnClick: true, 
                  pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                }
              );
          break;
          case "warning":
              toast.warning(text,
                {
                  position: "top-center", autoClose: ms, hideProgressBar: false, closeOnClick: true, 
                  pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                }
              );
          break;
      default:
          console.log("No options. There are no options.", option);
        break;
    }
  };
  