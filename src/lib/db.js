import Dexie from 'dexie'

export const db = new Dexie('KhmerlishDB')

db.version(1).stores({
  // Cached content (downloaded lessons)
  lessons: 'id, slug, category_id, level, is_downloaded, version',
  vocabulary: 'id, lesson_id, english, khmer',
  quiz_questions: 'id, lesson_id, question_type',
  quiz_options: 'id, question_id',
  categories: 'id, slug',

  // User's local progress (synced with server)
  lesson_progress: '[user_id+lesson_id], user_id, lesson_id, status, updated_at',
  vocabulary_progress: '[user_id+vocabulary_id], user_id, vocabulary_id, lesson_id, next_review_at',

  // Offline action queue
  sync_queue: '++id, action_type, created_at, synced',

  // User data cache
  user_profile: 'id',
  user_settings: 'user_id',
  user_achievements: '[user_id+achievement_id], user_id',
  study_days: '[user_id+study_date], user_id, study_date',

  // Achievements list
  achievements: 'id, slug'
})

// Helper to clear all user data on logout
export async function clearUserData() {
  await db.transaction('rw', [
    db.lesson_progress,
    db.vocabulary_progress,
    db.sync_queue,
    db.user_profile,
    db.user_settings,
    db.user_achievements,
    db.study_days
  ], async () => {
    await db.lesson_progress.clear()
    await db.vocabulary_progress.clear()
    await db.sync_queue.clear()
    await db.user_profile.clear()
    await db.user_settings.clear()
    await db.user_achievements.clear()
    await db.study_days.clear()
  })
}

// Helper to check if a lesson is downloaded
export async function isLessonDownloaded(lessonId) {
  const lesson = await db.lessons.get(lessonId)
  return lesson?.is_downloaded === true
}

// Helper to get downloaded lessons count
export async function getDownloadedLessonsCount() {
  return await db.lessons.where('is_downloaded').equals(1).count()
}
