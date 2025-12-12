import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { progressService } from '../services/progress.service'
import { userService } from '../services/user.service'
import { useAuth } from '../contexts/AuthContext'

export function useOverallStats() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['overallStats', user?.id],
    queryFn: () => progressService.getOverallStats(user.id),
    enabled: !!user?.id
  })
}

export function useContinueLearning() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['continueLearning', user?.id],
    queryFn: () => progressService.getContinueLearning(user.id),
    enabled: !!user?.id
  })
}

export function useStudyDays(startDate, endDate) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['studyDays', user?.id, startDate, endDate],
    queryFn: () => userService.getStudyDays(user.id, startDate, endDate),
    enabled: !!user?.id && !!startDate && !!endDate
  })
}

export function useAchievements() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['achievements', user?.id],
    queryFn: () => userService.getAchievements(user.id),
    enabled: !!user?.id
  })
}

export function useUpdateLessonProgress() {
  const { user, refreshProfile } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, wordsLearned, totalWords }) =>
      progressService.updateLessonProgress(user.id, lessonId, wordsLearned, totalWords),
    onSuccess: async (data, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', user?.id, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['overallStats', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['continueLearning', user?.id] })
      refreshProfile()
    }
  })
}

export function useUpdateStats() {
  const { user, refreshProfile } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ xpEarned, wordsStudied }) =>
      userService.updateStats(user.id, xpEarned, wordsStudied),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
      refreshProfile()
    }
  })
}
