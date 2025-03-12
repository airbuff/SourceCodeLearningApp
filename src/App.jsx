import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Sidebar } from "./components/Sidebar";
import { CodeDisplay } from "./components/CodeDisplay";
import { QuizSection } from "./components/QuizSection";
import { DarkModeToggle } from "./components/DarkModeToggle";

export default function App() {
  const [data, setData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Use a relative path to ensure it works in different environments
    fetch("./data/languages.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setSelectedLanguage(json.languages[0]);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data || !selectedLanguage) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar languages={data.languages} onSelect={setSelectedLanguage} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {selectedLanguage.name}
        </h1>
        <CodeDisplay
          code={selectedLanguage.code}
          language={selectedLanguage.name.toLowerCase()}
        />
        <QuizSection quiz={selectedLanguage.quiz} />
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Reference</h2>
            <a
              href={selectedLanguage.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {selectedLanguage.reference}
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
