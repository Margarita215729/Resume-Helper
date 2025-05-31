import Link from "next/link";
import { ArrowRight, FileText, Target, User, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              ИИ-помощник для создания резюме
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Создавайте идеальные резюме для любой вакансии
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Умное приложение, которое анализирует ваши навыки, изучает требования вакансий 
              и создает персонализированные резюме за считанные минуты
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/builder"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              Resume Builder
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link 
              href="/profile"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all border-2 border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              <User className="h-5 w-5 mr-2" />
              Profile Setup
            </Link>
            <Link 
              href="/matcher"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all border-2 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Target className="h-5 w-5 mr-2" />
              Job Matcher
            </Link>
          </div>

          {/* Demo Video Placeholder */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Демо видео работы приложения
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Как это работает
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Три простых шага к идеальному резюме
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Расскажите о себе
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ответьте на детальные вопросы о ваших навыках, опыте и предпочтениях. 
              Система запомнит всё и будет использовать эту информацию.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Загрузите вакансию
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Просто скопируйте текст интересующей вакансии. ИИ проанализирует требования 
              и определит, какие ваши навыки наиболее релевантны.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Получите результат
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Персонализированное резюме и сопроводительное письмо, оптимизированные 
              под конкретную вакансию, готовы к отправке.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Почему Resume Helper?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Zap className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Экономия времени
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Вместо часов на написание резюме под каждую вакансию - несколько минут
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Больше откликов
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Резюме, точно соответствующие требованиям, привлекают больше внимания HR
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Точное попадание
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ИИ выбирает именно те навыки и опыт, которые важны для конкретной позиции
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5мин</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">На создание резюме</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">3x</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Больше откликов</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">∞</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Резюме для разных сфер</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">0₽</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Бесплатно</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Готовы начать?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Создайте свой первый персонализированный резюме прямо сейчас
          </p>
          <Link 
            href="/profile"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Начать настройку профиля
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
