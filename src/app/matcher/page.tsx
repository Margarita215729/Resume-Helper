"use client";

import { useState } from "react";
import { FileText, Upload, Wand2, Download, Eye, Target, TrendingUp, AlertCircle } from "lucide-react";
import type { JobAnalysis } from "@/types/profile";

export default function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Мок-функция для анализа вакансии
  const analyzeJob = async () => {
    setIsAnalyzing(true);
    
    // Симуляция анализа
    setTimeout(() => {
      const mockAnalysis: JobAnalysis = {
        id: Date.now().toString(),
        jobTitle: "Frontend Developer",
        company: "Tech Company",
        jobDescription: jobDescription,
        requirements: ["React", "TypeScript", "CSS", "Git"],
        preferredSkills: ["Next.js", "Tailwind CSS", "Node.js"],
        jobType: "Full-time",
        location: "Remote",
        analysis: {
          matchingSkills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Git"],
          missingSkills: ["Next.js", "Testing"],
          relevantExperiences: ["Web Development Project", "Frontend Internship"],
          keywordMatches: [
            { keyword: "React", importance: 0.9 },
            { keyword: "TypeScript", importance: 0.8 },
            { keyword: "Remote", importance: 0.7 }
          ],
          overallMatchScore: 0.85,
          recommendations: [
            "Выделить опыт работы с React",
            "Упомянуть знание TypeScript",
            "Добавить примеры проектов"
          ]
        },
        createdAt: new Date().toISOString()
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateResume = async () => {
    setIsGenerating(true);
    
    // Симуляция генерации резюме
    setTimeout(() => {
      if (analysis) {
        const updatedAnalysis = {
          ...analysis,
          generatedResume: {
            selectedSkills: [],
            selectedExperiences: [],
            customSummary: "Опытный Frontend разработчик с сильными навыками в React и TypeScript. Специализируюсь на создании современных веб-приложений с отличным пользовательским опытом.",
            coverLetter: `Уважаемая команда ${analysis.company}!

Меня заинтересовала позиция ${analysis.jobTitle} в вашей компании. Мой опыт в области фронтенд-разработки и знание современных технологий делают меня идеальным кандидатом для этой роли.

Ключевые преимущества:
• Глубокое знание React и TypeScript
• Опыт создания адаптивных интерфейсов
• Понимание современных практик разработки

Я готов внести значительный вклад в развитие ваших продуктов и буду рад обсудить возможности сотрудничества.

С уважением,
[Ваше имя]`
          }
        };
        setAnalysis(updatedAnalysis);
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Target className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Анализ вакансий и создание резюме
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - Ввод вакансии */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Описание вакансии
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Вставьте текст вакансии
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Скопируйте и вставьте сюда полное описание вакансии, включая требования, обязанности и условия работы..."
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Загрузить файл
                </button>
                
                <button
                  onClick={analyzeJob}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Анализируем...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Анализировать
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Результаты анализа */}
            {analysis && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Результаты анализа
                </h3>

                {/* Общий скор */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Общее соответствие
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(analysis.analysis.overallMatchScore * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${analysis.analysis.overallMatchScore * 100}%` }}
                    />
                  </div>
                </div>

                {/* Совпадающие навыки */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ваши подходящие навыки:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.analysis.matchingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs dark:bg-green-900/20 dark:text-green-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Отсутствующие навыки */}
                {analysis.analysis.missingSkills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Навыки для изучения:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.analysis.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs dark:bg-yellow-900/20 dark:text-yellow-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Рекомендации */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Рекомендации:
                  </h4>
                  <ul className="space-y-1">
                    {analysis.analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <AlertCircle className="h-3 w-3 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Генерируем резюме...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Создать персонализированное резюме
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Правая колонка - Результат */}
          <div className="space-y-6">
            {analysis?.generatedResume && (
              <>
                {/* Cover Letter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Сопроводительное письмо
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
                      {analysis.generatedResume.coverLetter}
                    </pre>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md dark:hover:bg-blue-900/20">
                      <Eye className="h-4 w-4 mr-2" />
                      Предварительный просмотр
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </button>
                  </div>
                </div>

                {/* Resume Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Персонализированное резюме
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Краткое описание:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      {analysis.generatedResume.customSummary}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md dark:hover:bg-blue-900/20">
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр полного резюме
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Скачать PDF
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Статистика применений
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Резюме создано</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Положительных откликов</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!analysis && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Готовы к анализу?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Вставьте описание вакансии слева, и мы создадим для вас персонализированное резюме и сопроводительное письмо.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
