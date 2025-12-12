import { supabase } from '../lib/supabase'

export const vocabularyService = {
  async getVocabulary(lessonId) {
    const { data, error } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getVocabularyProgress(userId, lessonId) {
    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .select(`
        *,
        vocabulary:vocabulary(*)
      `)
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)

    if (error) throw error
    return data
  },

  async updateVocabularyProgress(userId, vocabularyId, lessonId, updates) {
    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .upsert({
        user_id: userId,
        vocabulary_id: vocabularyId,
        lesson_id: lessonId,
        ...updates,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,vocabulary_id'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getDueReviews(userId, limit = 20) {
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .select(`
        *,
        vocabulary:vocabulary(*),
        lesson:lessons(id, slug, title_khmer, title_english)
      `)
      .eq('user_id', userId)
      .or(`next_review_at.is.null,next_review_at.lte.${now}`)
      .order('next_review_at', { ascending: true, nullsFirst: true })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getDueReviewsCount(userId) {
    const now = new Date().toISOString()

    const { count, error } = await supabase
      .from('user_vocabulary_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .or(`next_review_at.is.null,next_review_at.lte.${now}`)

    if (error) throw error
    return count || 0
  },

  async getLearnedWordsCount(userId) {
    const { count, error } = await supabase
      .from('user_vocabulary_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('mastery_level', 1)

    if (error) throw error
    return count || 0
  },

  async getMasteredWordsCount(userId) {
    const { count, error } = await supabase
      .from('user_vocabulary_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('mastery_level', 4)

    if (error) throw error
    return count || 0
  }
}
