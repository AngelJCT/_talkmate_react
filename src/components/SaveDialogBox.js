import React from 'react';

function SaveDialogBox({ isOpen, onClose, onSave }) {
  const [title, setTitle] = React.useState("");

  const handleSave = () => {
    onSave(title);
    setTitle(""); // reset title after saving
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-300 p-8 rounded-lg w-1/3">
        <h2 className="text-xl mb-4 text-custom-blue font-medium">Title for this conversation:</h2>
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 shadow-md outline-none focus:ring-2 focus:ring-custom-blue text-gray-600"
        />
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded-lg text-custom-blue shadow-xl">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-custom-blue text-white rounded-lg shadow-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveDialogBox;
