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
    fetch("../data/languages.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setSelectedLanguage(json.languages[0]);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  if (!data || !selectedLanguage) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        languages={data.languages} 
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageSelect}
      />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{selectedLanguage.name}</h1>
          <DarkModeToggle />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Reference</h2>
              <div className="prose dark:prose-invert">
                {selectedLanguage.reference}
              </div>
            </CardContent>
          </Card>
          <CodeDisplay code={selectedLanguage.code} language={selectedLanguage.id} />
        </div>
        <div className="mt-6">
          <QuizSection quiz={selectedLanguage.quiz} />
        </div>
      </div>
    </div>
  );
}
