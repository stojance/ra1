export default function confirmReducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        ...state,
        message: "",
        confirmButtonDisabled: true,
        showConfirmation: true,
      };
      case "START_DELETE":
        return {
          ...state,
          message: "",
          deleteButtonDisabled: true,
          showDelete: true,
        };
    case "CANCEL":
      return {
        ...state,
        showConfirmation: false,
        showDelete: false,
        showResult: false,
        message: "",
        confirmButtonDisabled: false,
        deleteButtonDisabled: false,
      };
    
    case "CONFIRM":
      return {
        ...state,
        showConfirmation: false,
        showDelete: false,
        message: action.payload,
        confirmButtonDisabled: false,
      };
      case "CONFIRM_DELETE":
        return {
          ...state,
          showConfirmation: false,
          showDelete: false,
          showResult: true,
          message: action.payload,
          deleteButtonDisabled: false,
        };
    case "FINISH":
      return {
        ...state,
        showConfirmation: false,
        showDelete: false,
        showResult: false,
        message: "",
        confirmButtonDisabled: false,
        deleteButtonDisabled: false,
      };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}
