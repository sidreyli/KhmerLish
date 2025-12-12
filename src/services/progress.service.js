import { supabase } from '../lib/supabase'
import { SM2 } from './spaced-repetition'

export const progressService = {
  // Update vocabulary progress after flashcard review
  async recordFlashcardReview(userId, vocabularyId, lessonId, rating) {
    // Get current progress
    const { data: current } = await supabase
      .from('user_vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('vocabulary_id', vocabularyId)
      .maybeSingle()

    // Calculate next review using SM-2
    const nextReview = SM2.calculateNextReview(rating, current || {})

    // Update or insert progress
    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .upsert({
        user_id: userId,
        vocabulary_id: vocabularyId,
        lesson_id: lessonId,
        mastery_level: nextReview.mastery_level,
        ease_factor: nextReview.ease_factor,
        interval_days: nextReview.interval_days,
        repetitions: nextReview.repetitions,
        next_review_at: nextReview.next_review_at,
        last_reviewed_at: nextReview.last_reviewed_at,
        last_rating: rating,
        total_reviews: (current?.total_reviews || 0) + 1,
        correct_reviews: (current?.correct_reviews || 0) + (rating !== 'hard' ? 1 : 0),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,vocabulary_id'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update lesson progress after studying
  async updateLessonProgress(userId, lessonId, wordsLearned, totalWords) {
    const progressPercent = Math.round((wordsLearned / totalWords) * 100)
    const status = progressPercent >= 100 ? 'completed' : progressPercent > 0 ? 'in_progress' : 'not_started'

    const updates = {
      status,
      progress_percent: progressPercent,
      words_learned: wordsLearned,
      last_studied_at: new Date().toISOString()
    }

    if (status === 'in_progress' && !updates.started_at) {
      updates.started_at = new Date().toISOString()
    }

    if (status === 'completed') {
      updates.completed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        ...updates,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get overall stats for a user
  async getOverallStats(userId) {
    const [
      lessonsInProgress,
      lessonsCompleted,
      wordsLearned,
      wordsMastered,
      dueReviews
    ] = await Promise.all([
      supabase
        .from('user_lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'in_progress'),
      supabase
        .from('user_lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'completed'),
      supabase
        .from('user_vocabulary_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('mastery_level', 1),
      supabase
        .from('user_vocabulary_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('mastery_level', 4),
      supabase
        .from('user_vocabulary_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .or(`next_review_at.is.null,next_review_at.lte.${new Date().toISOString()}`)
    ])

    return {
      lessonsInProgress: lessonsInProgress.count || 0,
      lessonsCompleted: lessonsCompleted.count || 0,
      wordsLearned: wordsLearned.count || 0,
      wordsMastered: wordsMastered.count || 0,
      dueReviews: dueReviews.count || 0
    }
  },

  // Get continue learning suggestion
  async getContinueLearning(userId) {
    // Get the most recently studied incomplete lesson
    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select(`
        *,
        lesson:lessons(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .order('last_studied_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    return data
  }
}
