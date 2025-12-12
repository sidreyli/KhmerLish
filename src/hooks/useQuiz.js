import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quiz.service'
import { userService } from '../services/user.service'
import { useAuth } from '../contexts/AuthContext'

export function useQuizQuestions(lessonId) {
  return useQuery({
    queryKey: ['quizQuestions', lessonId],
    queryFn: () => quizService.getQuizQuestions(lessonId),
    enabled: !!lessonId
  })
}

export function useQuizAttempts(lessonId) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['quizAttempts', user?.id, lessonId],
    queryFn: () => quizService.getQuizAttempts(user.id, lessonId),
    enabled: !!user?.id && !!lessonId
  })
}

export function useBestQuizScore(lessonId) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['bestQuizScore', user?.id, lessonId],
    queryFn: () => quizService.getBestQuizScore(user.id, lessonId),
    enabled: !!user?.id && !!lessonId
  })
}

export function useSaveQuizAttempt() {
  const { user, refreshProfile } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, attemptData }) =>
      quizService.saveQuizAttempt(user.id, lessonId, attemptData),
    onSuccess: async (data, { lessonId, attemptData }) => {
      // Update user stats with XP earned
      if (attemptData.xpEarned > 0) {
        await userService.updateStats(user.id, attemptData.xpEarned, 0)
        refreshProfile()
      }

      queryClient.invalidateQueries({ queryKey: ['quizAttempts', user?.id, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['bestQuizScore', user?.id, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
    }
  })
}

export function useTotalQuizzesTaken() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['totalQuizzesTaken', user?.id],
    queryFn: () => quizService.getTotalQuizzesTaken(user.id),
    enabled: !!user?.id
  })
}
