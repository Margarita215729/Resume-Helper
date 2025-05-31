"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Save, User, Settings, Brain, Briefcase, GraduationCap, Target, Heart } from "lucide-react";
import { profileQuestions } from "@/data/questions";
import { QuestionRenderer } from "@/components/profile/QuestionRenderer";
import type { ProfileData } from "@/types/profile";

const categoryIcons = {
  basic_info: User,
  education: GraduationCap,
  technical_skills: Settings,
  work_experience: Briefcase,
  industry_specific: Brain,
  soft_skills: Heart,
  career_goals: Target,
};

const categoryLabels = {
  basic_info: "Basic Information",
  education: "Education",
  technical_skills: "Technical Skills",
  work_experience: "Work Experience",
  industry_specific: "Industry Experience",
  soft_skills: "Soft Skills",
  career_goals: "Career Goals",
};

export default function ProfileSetup() {
  const [currentCategory, setCurrentCategory] = useState('basic_info');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({});

  // Get unique categories from questions
  const categories = Array.from(new Set(profileQuestions.map(q => q.category)));
  
  // Get questions for current category
  const currentCategoryQuestions = profileQuestions.filter(q => q.category === currentCategory);
  const currentQuestion = currentCategoryQuestions[currentQuestionIndex];

  const totalQuestions = profileQuestions.length;
  const answeredQuestions = Object.keys(profileData).filter(key => {
    const value = profileData[key];
    return value !== undefined && value !== null && value !== '' && 
           (Array.isArray(value) ? value.length > 0 : true);
  }).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: unknown) => {
    setProfileData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next category
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategory(categories[currentCategoryIndex + 1]);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Move to previous category
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex > 0) {
        const prevCategory = categories[currentCategoryIndex - 1];
        const prevCategoryQuestions = profileQuestions.filter(q => q.category === prevCategory);
        setCurrentCategory(prevCategory);
        setCurrentQuestionIndex(prevCategoryQuestions.length - 1);
      }
    }
  };

  const jumpToCategory = (category: string) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0);
  };

  const saveProfile = async () => {
    try {
      localStorage.setItem('resumeHelperProfile', JSON.stringify(profileData));
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };

  const loadProfile = () => {
    try {
      const saved = localStorage.getItem('resumeHelperProfile');
      if (saved) {
        setProfileData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const currentCategoryIndex = categories.indexOf(currentCategory);
  const isFirstQuestion = currentCategoryIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentCategoryIndex === categories.length - 1 && 
                         currentQuestionIndex === currentCategoryQuestions.length - 1;

  // Show completion screen if we're past all questions
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center max-w-md shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Great! Now we know about your skills and preferences. You can start creating personalized resumes.
          </p>
          <button 
            onClick={() => window.location.href = '/resumes'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile Setup</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {answeredQuestions} of {totalQuestions} completed
              </div>
              <button
                onClick={saveProfile}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Category Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Brain;
                  const categoryQuestions = profileQuestions.filter(q => q.category === category);
                  const categoryAnswered = categoryQuestions.filter(q => 
                    profileData[q.id] !== undefined && profileData[q.id] !== null && profileData[q.id] !== ''
                  ).length;
                  const isActive = category === currentCategory;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => jumpToCategory(category)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {categoryLabels[category as keyof typeof categoryLabels] || category}
                        </div>
                        <div className="text-xs text-gray-500">
                          {categoryAnswered}/{categoryQuestions.length}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Question Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {categoryLabels[currentCategory as keyof typeof categoryLabels] || currentCategory}
                  </span>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {currentCategoryQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / currentCategoryQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                {currentQuestion && (
                  <QuestionRenderer
                    question={currentQuestion}
                    value={profileData[currentQuestion.id]}
                    onChange={(value) => handleAnswer(currentQuestion.id, value)}
                    profileData={profileData}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={isFirstQuestion}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAnswer(currentQuestion?.id || '', null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Skip
                  </button>
                  
                  <button
                    onClick={nextQuestion}
                    disabled={isLastQuestion}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                    {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-1" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
