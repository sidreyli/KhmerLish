import { supabase } from '../lib/supabase'

export const quizService = {
  async getQuizQuestions(lessonId) {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        options:quiz_options(*)
      `)
      .eq('lesson_id', lessonId)
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Sort options within each question
    return data.map(question => ({
      ...question,
      options: question.options.sort((a, b) => a.sort_order - b.sort_order)
    }))
  },

  async saveQuizAttempt(userId, lessonId, attemptData) {
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        score_percent: attemptData.scorePercent,
        correct_count: attemptData.correctCount,
        total_questions: attemptData.totalQuestions,
        time_taken_seconds: attemptData.timeTaken,
        xp_earned: attemptData.xpEarned,
        passed: attemptData.passed,
        started_at: attemptData.startedAt,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (attemptError) throw attemptError

    // Save individual answers if provided
    if (attemptData.answers && attemptData.answers.length > 0) {
      const answersToInsert = attemptData.answers.map(answer => ({
        attempt_id: attempt.id,
        question_id: answer.questionId,
        user_answer: answer.userAnswer,
        is_correct: answer.isCorrect,
        time_taken_seconds: answer.timeTaken
      }))

      const { error: answersError } = await supabase
        .from('quiz_answers')
        .insert(answersToInsert)

      if (answersError) throw answersError
    }

    return attempt
  },

  async getQuizAttempts(userId, lessonId) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getBestQuizScore(userId, lessonId) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('score_percent')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .order('score_percent', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    return data?.score_percent || 0
  },

  async getTotalQuizzesTaken(userId) {
    const { count, error } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (error) throw error
    return count || 0
  }
}
