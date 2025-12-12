import { supabase } from '../lib/supabase'

export const lessonService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getLessons(categoryId = null, level = null) {
    let query = supabase
      .from('lessons')
      .select(`
        *,
        category:categories(id, name_khmer, name_english, emoji)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (level) {
      query = query.eq('level', level)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  async getLesson(lessonId) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        category:categories(id, name_khmer, name_english, emoji)
      `)
      .eq('id', lessonId)
      .single()

    if (error) throw error
    return data
  },

  async getLessonBySlug(slug) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        category:categories(id, name_khmer, name_english, emoji)
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async getLessonWithVocabulary(lessonId) {
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select(`
        *,
        category:categories(id, name_khmer, name_english, emoji)
      `)
      .eq('id', lessonId)
      .single()

    if (lessonError) throw lessonError

    const { data: vocabulary, error: vocabError } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('sort_order', { ascending: true })

    if (vocabError) throw vocabError

    return { ...lesson, vocabulary }
  },

  async getUserLessonProgress(userId) {
    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select(`
        *,
        lesson:lessons(id, slug, title_khmer, title_english, icon_emoji)
      `)
      .eq('user_id', userId)

    if (error) throw error
    return data
  },

  async getLessonProgress(userId, lessonId) {
    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle()

    if (error) throw error
    return data
  },

  async updateLessonProgress(userId, lessonId, updates) {
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
  }
}
