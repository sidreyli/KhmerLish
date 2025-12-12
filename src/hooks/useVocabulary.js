import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vocabularyService } from '../services/vocabulary.service'
import { progressService } from '../services/progress.service'
import { useAuth } from '../contexts/AuthContext'

export function useVocabulary(lessonId) {
  return useQuery({
    queryKey: ['vocabulary', lessonId],
    queryFn: () => vocabularyService.getVocabulary(lessonId),
    enabled: !!lessonId
  })
}

export function useVocabularyProgress(lessonId) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['vocabularyProgress', user?.id, lessonId],
    queryFn: () => vocabularyService.getVocabularyProgress(user.id, lessonId),
    enabled: !!user?.id && !!lessonId
  })
}

export function useDueReviews(limit = 20) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['dueReviews', user?.id, limit],
    queryFn: () => vocabularyService.getDueReviews(user.id, limit),
    enabled: !!user?.id
  })
}

export function useDueReviewsCount() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['dueReviewsCount', user?.id],
    queryFn: () => vocabularyService.getDueReviewsCount(user.id),
    enabled: !!user?.id
  })
}

export function useLearnedWordsCount() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['learnedWordsCount', user?.id],
    queryFn: () => vocabularyService.getLearnedWordsCount(user.id),
    enabled: !!user?.id
  })
}

export function useRecordFlashcardReview() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ vocabularyId, lessonId, rating }) =>
      progressService.recordFlashcardReview(user.id, vocabularyId, lessonId, rating),
    onSuccess: (data, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['vocabularyProgress', user?.id, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['dueReviews', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['dueReviewsCount', user?.id] })
      queryClient.invalidateQueries({ queryKey: ['learnedWordsCount', user?.id] })
    }
  })
}
