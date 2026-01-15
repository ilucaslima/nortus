import { ReactNode } from "react";
import { CloseIcon } from "./ui/icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative bg-dashboard rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6">
          <p className="text-2xl font-montserrat text-white">{title}</p>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 border rounded-full transition-colors duration-200"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
