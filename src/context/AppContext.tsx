'use client'

import { QuestionnaireResponse, Resume } from '@/types/resume'
import React, { createContext, ReactNode, useContext, useReducer } from 'react'

interface AppState {
    currentResume: Resume | null
    questionnaireData: QuestionnaireResponse[]
    isOnboardingComplete: boolean
    currentStep: number
}

type AppAction =
    | { type: 'SET_RESUME'; payload: Resume }
    | { type: 'UPDATE_QUESTIONNAIRE'; payload: QuestionnaireResponse }
    | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean }
    | { type: 'SET_CURRENT_STEP'; payload: number }
    | { type: 'RESET_STATE' }

const initialState: AppState = {
    currentResume: null,
    questionnaireData: [],
    isOnboardingComplete: false,
    currentStep: 0
}

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_RESUME':
            return { ...state, currentResume: action.payload }
        case 'UPDATE_QUESTIONNAIRE':
            const existingIndex = state.questionnaireData.findIndex(
                q => q.question === action.payload.question
            )
            if (existingIndex >= 0) {
                const updated = [...state.questionnaireData]
                updated[existingIndex] = action.payload
                return { ...state, questionnaireData: updated }
            }
            return {
                ...state,
                questionnaireData: [...state.questionnaireData, action.payload]
            }
        case 'SET_ONBOARDING_COMPLETE':
            return { ...state, isOnboardingComplete: action.payload }
        case 'SET_CURRENT_STEP':
            return { ...state, currentStep: action.payload }
        case 'RESET_STATE':
            return initialState
        default:
            return state
    }
}

const AppContext = createContext<{
    state: AppState
    dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
