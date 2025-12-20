import Toast from "react-native-toast-message";

export const formatDate = (dateString: any) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Not provided';
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Not provided';
    }
};

export const formatDateToStringSlash = (dateInput: Date | string): string => {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return ""; // handle invalid dates

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

// Utility function
export const formatCategory = (str: string) => {
    if (!str) return "";
    return str
        .replace(/_/g, " ")
        .replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
};

export const successNitification = (text2: string, text1: string = "Success", visibilityTime = 2500, autoHide = true) => {
    Toast.show({
        type: 'success',
        text1,
        text2,
        visibilityTime,
        autoHide,
    });
}

export const errorNotification = (text2: string, text1: string = "Error", visibilityTime = 3000, autoHide = true) => {
    console.log("global error", text2)
    console.log("notification")
    Toast.show({
        type: "error",
        text1,
        text2: text2 ? text2 : "Something went wrong",
        visibilityTime,
        autoHide,
    });
};

export const infoNotification = (text2: string, text1: string = "Info", visibilityTime = 2000, autoHide = true) => {
    Toast.show({
        type: "info",
        text1,
        text2,
        visibilityTime
    });
};

export const getApiErrorMessage = (err: unknown): string => {
  if (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof (err as any).data?.message === "string"
  ) {
    return (err as any).data.message;
  }

  return "Something went wrong";
};