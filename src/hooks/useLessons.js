import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lessonService } from '../services/lesson.service'
import { useAuth } from '../contexts/AuthContext'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: lessonService.getCategories
  })
}

export function useLessons(categoryId = null, level = null) {
  return useQuery({
    queryKey: ['lessons', categoryId, level],
    queryFn: () => lessonService.getLessons(categoryId, level)
  })
}

export function useLesson(lessonId) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonService.getLesson(lessonId),
    enabled: !!lessonId
  })
}

export function useLessonWithVocabulary(lessonId) {
  return useQuery({
    queryKey: ['lesson', lessonId, 'vocabulary'],
    queryFn: () => lessonService.getLessonWithVocabulary(lessonId),
    enabled: !!lessonId
  })
}

export function useUserLessonProgress() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['lessonProgress', user?.id],
    queryFn: () => lessonService.getUserLessonProgress(user.id),
    enabled: !!user?.id
  })
}

export function useLessonProgress(lessonId) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['lessonProgress', user?.id, lessonId],
    queryFn: () => lessonService.getLessonProgress(user.id, lessonId),
    enabled: !!user?.id && !!lessonId
  })
}

export function useUpdateLessonProgress() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, updates }) =>
      lessonService.updateLessonProgress(user.id, lessonId, updates),
    onSuccess: (data, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', user?.id, lessonId] })
    }
  })
}
