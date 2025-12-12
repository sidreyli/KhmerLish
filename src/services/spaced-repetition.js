// SM-2 Spaced Repetition Algorithm
// Based on SuperMemo SM-2 algorithm

export const SM2 = {
  // Quality ratings map
  qualityMap: {
    hard: 1,   // Difficult, needs more review
    okay: 3,   // Moderate difficulty
    easy: 5    // Easy, extend interval
  },

  calculateNextReview(rating, currentData = {}) {
    const quality = this.qualityMap[rating] || 3
    const {
      ease_factor = 2.5,
      interval_days = 0,
      repetitions = 0,
      mastery_level = 0
    } = currentData

    let newInterval, newEF, newReps, newMastery

    if (quality < 3) {
      // Failed review - reset repetitions but keep some progress
      newReps = 0
      newInterval = 1
      newMastery = Math.max(0, mastery_level - 1)
    } else {
      // Successful review
      newReps = repetitions + 1

      if (newReps === 1) {
        newInterval = 1
      } else if (newReps === 2) {
        newInterval = 6
      } else {
        newInterval = Math.round(interval_days * ease_factor)
      }

      // Increase mastery level based on rating
      if (rating === 'easy') {
        newMastery = Math.min(5, mastery_level + 1)
      } else if (rating === 'okay') {
        newMastery = Math.min(5, mastery_level + 0.5)
      } else {
        newMastery = mastery_level
      }
    }

    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    newEF = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

    // Keep ease factor above minimum
    newEF = Math.max(1.3, newEF)

    // Calculate next review date
    const nextReviewAt = new Date()
    nextReviewAt.setDate(nextReviewAt.getDate() + newInterval)

    return {
      ease_factor: Math.round(newEF * 100) / 100,
      interval_days: newInterval,
      repetitions: newReps,
      mastery_level: Math.round(newMastery * 10) / 10,
      next_review_at: nextReviewAt.toISOString(),
      last_reviewed_at: new Date().toISOString()
    }
  },

  // Get mastery level label
  getMasteryLabel(level) {
    if (level >= 4) return { label: 'Mastered', color: '#4A9B5C' }
    if (level >= 3) return { label: 'Familiar', color: '#1A6B6B' }
    if (level >= 2) return { label: 'Learning', color: '#E8913A' }
    if (level >= 1) return { label: 'Started', color: '#F5A623' }
    return { label: 'New', color: '#6B5D4D' }
  },

  // Calculate memory strength as percentage
  getMemoryStrength(progress) {
    if (!progress || !progress.next_review_at) return 100

    const now = new Date()
    const nextReview = new Date(progress.next_review_at)
    const lastReview = progress.last_reviewed_at ? new Date(progress.last_reviewed_at) : now

    // If review is due or overdue, strength decreases
    if (now >= nextReview) {
      const overdueDays = (now - nextReview) / (1000 * 60 * 60 * 24)
      // Decay faster for longer overdue
      return Math.max(0, Math.round(100 - overdueDays * 10))
    }

    // Calculate strength based on how close we are to next review
    const totalInterval = nextReview - lastReview
    const elapsed = now - lastReview
    const remaining = totalInterval - elapsed

    // Strength is high at the beginning and decreases as review approaches
    const strength = Math.round((remaining / totalInterval) * 100)
    return Math.max(0, Math.min(100, strength))
  },

  // Check if a word is due for review
  isDue(progress) {
    if (!progress || !progress.next_review_at) return true
    return new Date() >= new Date(progress.next_review_at)
  }
}
