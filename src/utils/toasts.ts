import { ToastCreationProps } from "./createToast";

export const SuccessRoundFinishedToast: ToastCreationProps = {
  type: "success",
  message: "Ciclo finalizado! ⏳",
};

export const SuccessCycleFinishedToast: ToastCreationProps = {
  type: "success",
  message: "Jornada finalizada! 🔥",
};

export const SuccessCyclesCleanedToast: ToastCreationProps = {
  type: "success",
  message: "Histórico zerado! ",
};

export const SuccessSettingsSavedToast: ToastCreationProps = {
  type: "success",
  message: "Configurações salvas!",
};

export const SuccessCyclesExportedToast: ToastCreationProps = {
  type: "success",
  message: "Histórico salvo!",
};

export const ErrorCyclesExportedToast: ToastCreationProps = {
  type: "danger",
  message: "Não foi possível salvar o histórico.",
};
