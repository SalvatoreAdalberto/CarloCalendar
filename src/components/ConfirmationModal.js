import React from "react";
import { useTranslation } from "react-i18next";
import { db, auth } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ConfirmationModal = ({ label, setShowConfirmationModal, setLabels, labels }) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      const labelRef = doc(db, `users/${auth.currentUser.uid}/labels`, label.id);
      await deleteDoc(labelRef);
      setLabels(labels.filter((lbl) => lbl.id !== label.id));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50 dark:bg-zinc-800 dark:bg-opacity-75">
      <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-2xl w-1/3 z-50">
        <header className="bg-gray-100 dark:bg-zinc-900 px-4 py-2 flex justify-between items-center rounded-t-lg">
          <h2 className="text-gray-600 dark:text-zinc-50">Conferma Eliminazione</h2>
          <button
            onClick={handleClose}
            className="material-icons-outlined text-gray-400 dark:text-zinc-200"
          >
            close
          </button>
        </header>
        <div className="p-4">
          <p className="text-gray-600 dark:text-zinc-50">
            Sei sicuro di voler eliminare la categoria {label.name}?
          </p>
        </div>
        <footer className="flex justify-end border-t p-3">
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded text-white mr-2"
          >
            Cancella
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
          > Elimina
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;