-- =============================================
-- KHMERLISH DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- =============================================
-- CONTENT TABLES (Admin-managed)
-- =============================================

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_khmer TEXT NOT NULL,
  name_english TEXT NOT NULL,
  emoji TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lessons
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  title_khmer TEXT NOT NULL,
  title_english TEXT NOT NULL,
  description_khmer TEXT,
  description_english TEXT,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2')),
  word_count INTEGER DEFAULT 0,
  estimated_duration INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 50,
  sort_order INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  icon_emoji TEXT,
  gradient_colors JSONB DEFAULT '["#FFE4B5", "#FFD700"]',
  download_size_kb INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vocabulary
CREATE TABLE public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  english TEXT NOT NULL,
  khmer TEXT NOT NULL,
  ipa TEXT,
  phonetic_khmer TEXT,
  example_english TEXT,
  example_khmer TEXT,
  emoji TEXT,
  audio_url TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz Questions
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'listening', 'image_match', 'fill_blank', 'translation')),
  question_text TEXT NOT NULL,
  question_text_khmer TEXT,
  correct_answer TEXT NOT NULL,
  hint TEXT,
  explanation TEXT,
  audio_url TEXT,
  image_url TEXT,
  emoji TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz Options (for multiple choice)
CREATE TABLE public.quiz_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_label TEXT,
  is_correct BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- USER TABLES
-- =============================================

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  level TEXT DEFAULT 'A1' CHECK (level IN ('A1', 'A2', 'B1', 'B2')),
  xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Settings
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  sound_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  daily_reminder_time TIME DEFAULT '09:00',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  daily_goal INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Lesson Progress
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  words_learned INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_studied_at TIMESTAMPTZ,
  is_downloaded BOOLEAN DEFAULT false,
  downloaded_at TIMESTAMPTZ,
  download_version INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- User Vocabulary Progress (Spaced Repetition)
CREATE TABLE public.user_vocabulary_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID REFERENCES public.vocabulary(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  ease_factor DECIMAL(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  last_rating TEXT CHECK (last_rating IN ('hard', 'okay', 'easy')),
  total_reviews INTEGER DEFAULT 0,
  correct_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, vocabulary_id)
);

-- Quiz Attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  score_percent INTEGER NOT NULL CHECK (score_percent BETWEEN 0 AND 100),
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  xp_earned INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz Answers
CREATE TABLE public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE SET NULL,
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- GAMIFICATION
-- =============================================

-- Achievements
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_khmer TEXT NOT NULL,
  title_english TEXT NOT NULL,
  description_khmer TEXT,
  description_english TEXT,
  emoji TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Achievements
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Study Calendar
CREATE TABLE public.user_study_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  study_date DATE NOT NULL,
  words_studied INTEGER DEFAULT 0,
  minutes_studied INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  lessons_touched UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, study_date)
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_days ENABLE ROW LEVEL SECURITY;

-- Content tables: readable by all authenticated users
CREATE POLICY "Anyone can read categories" ON public.categories
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Anyone can read lessons" ON public.lessons
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Anyone can read vocabulary" ON public.vocabulary
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read quiz questions" ON public.quiz_questions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read quiz options" ON public.quiz_options
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read achievements" ON public.achievements
  FOR SELECT TO authenticated USING (is_active = true);

-- User tables: users can only access their own data
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own settings" ON public.user_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own lesson progress" ON public.user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own vocabulary progress" ON public.user_vocabulary_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own quiz answers" ON public.quiz_answers
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.quiz_attempts WHERE id = attempt_id));

CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own study days" ON public.user_study_days
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);

  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update user stats (XP, streak)
CREATE OR REPLACE FUNCTION public.update_user_stats(
  p_user_id UUID,
  p_xp_earned INTEGER,
  p_words_studied INTEGER DEFAULT 0
)
RETURNS void AS $$
DECLARE
  v_last_study_date DATE;
  v_today DATE := CURRENT_DATE;
  v_current_streak INTEGER;
BEGIN
  SELECT last_study_date, current_streak
  INTO v_last_study_date, v_current_streak
  FROM public.profiles WHERE id = p_user_id;

  -- Update XP
  UPDATE public.profiles
  SET xp = xp + p_xp_earned,
      updated_at = now()
  WHERE id = p_user_id;

  -- Update streak
  IF v_last_study_date IS NULL OR v_last_study_date < v_today - INTERVAL '1 day' THEN
    UPDATE public.profiles
    SET current_streak = 1,
        last_study_date = v_today
    WHERE id = p_user_id;
  ELSIF v_last_study_date = v_today - INTERVAL '1 day' THEN
    UPDATE public.profiles
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_study_date = v_today
    WHERE id = p_user_id;
  ELSIF v_last_study_date < v_today THEN
    UPDATE public.profiles
    SET last_study_date = v_today
    WHERE id = p_user_id;
  END IF;

  -- Upsert study day record
  INSERT INTO public.user_study_days (user_id, study_date, words_studied, xp_earned)
  VALUES (p_user_id, v_today, p_words_studied, p_xp_earned)
  ON CONFLICT (user_id, study_date)
  DO UPDATE SET
    words_studied = user_study_days.words_studied + p_words_studied,
    xp_earned = user_study_days.xp_earned + p_xp_earned;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_vocabulary_updated_at
  BEFORE UPDATE ON public.vocabulary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_lesson_progress_updated_at
  BEFORE UPDATE ON public.user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_vocabulary_progress_updated_at
  BEFORE UPDATE ON public.user_vocabulary_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_lessons_category ON public.lessons(category_id);
CREATE INDEX idx_lessons_level ON public.lessons(level);
CREATE INDEX idx_vocabulary_lesson ON public.vocabulary(lesson_id);
CREATE INDEX idx_quiz_questions_lesson ON public.quiz_questions(lesson_id);
CREATE INDEX idx_quiz_options_question ON public.quiz_options(question_id);
CREATE INDEX idx_user_lesson_progress_user ON public.user_lesson_progress(user_id);
CREATE INDEX idx_user_vocabulary_progress_user ON public.user_vocabulary_progress(user_id);
CREATE INDEX idx_user_vocabulary_progress_next_review ON public.user_vocabulary_progress(next_review_at);
CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX idx_user_study_days_user_date ON public.user_study_days(user_id, study_date);
