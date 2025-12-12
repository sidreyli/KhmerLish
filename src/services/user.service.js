import { supabase } from '../lib/supabase'

export const userService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getSettings(userId) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updateSettings(userId, updates) {
    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getStudyDays(userId, startDate, endDate) {
    const { data, error } = await supabase
      .from('user_study_days')
      .select('*')
      .eq('user_id', userId)
      .gte('study_date', startDate)
      .lte('study_date', endDate)
      .order('study_date', { ascending: true })

    if (error) throw error
    return data
  },

  async getAchievements(userId) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', userId)

    if (error) throw error
    return data
  },

  async updateStats(userId, xpEarned, wordsStudied = 0) {
    const { error } = await supabase
      .rpc('update_user_stats', {
        p_user_id: userId,
        p_xp_earned: xpEarned,
        p_words_studied: wordsStudied
      })

    if (error) throw error
  }
}
