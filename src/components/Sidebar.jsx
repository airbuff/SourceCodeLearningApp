import { useState } from "react";

export function Sidebar({ languages, onSelect }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0].name);

  const handleSelect = (language) => {
    setCurrentLanguage(language.name);
    onSelect(language);
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Programming Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name} className="mb-2">
            <button
              onClick={() => handleSelect(language)}
              className={`w-full text-left px-4 py-2 rounded ${
                currentLanguage === language.name
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {language.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
