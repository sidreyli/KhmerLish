-- =============================================
-- KHMERLISH SEED DATA
-- Run this after schema.sql to populate initial content
-- =============================================

-- =============================================
-- CATEGORIES
-- =============================================

INSERT INTO public.categories (slug, name_khmer, name_english, emoji, sort_order) VALUES
('greetings', 'ការស្វាគមន៍', 'Greetings', '👋', 1),
('numbers', 'លេខ', 'Numbers', '🔢', 2),
('family', 'គ្រួសារ', 'Family', '👨‍👩‍👧‍👦', 3),
('food', 'អាហារ', 'Food', '🍜', 4),
('school', 'សាលារៀន', 'School', '🏫', 5),
('travel', 'ការធ្វើដំណើរ', 'Travel', '✈️', 6);

-- =============================================
-- LESSONS
-- =============================================

-- Get category IDs
DO $$
DECLARE
  greetings_id UUID;
  numbers_id UUID;
  family_id UUID;
  food_id UUID;
  school_id UUID;
  travel_id UUID;

  greetings_lesson_id UUID;
  numbers_lesson_id UUID;
  family_lesson_id UUID;
  food_lesson_id UUID;
BEGIN
  SELECT id INTO greetings_id FROM public.categories WHERE slug = 'greetings';
  SELECT id INTO numbers_id FROM public.categories WHERE slug = 'numbers';
  SELECT id INTO family_id FROM public.categories WHERE slug = 'family';
  SELECT id INTO food_id FROM public.categories WHERE slug = 'food';
  SELECT id INTO school_id FROM public.categories WHERE slug = 'school';
  SELECT id INTO travel_id FROM public.categories WHERE slug = 'travel';

  -- Greetings lesson
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('greetings', greetings_id, 'ការស្វាគមន៍', 'Greetings', 'រៀនពាក្យស្វាគមន៍ជាមូលដ្ឋាន', 'Learn basic greeting words', 'A1', 10, 15, 50, 1, '👋', '["#FFE4B5", "#FFD700"]')
  RETURNING id INTO greetings_lesson_id;

  -- Numbers lesson
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('numbers-1-10', numbers_id, 'លេខ ១-១០', 'Numbers 1-10', 'រៀនលេខពី ១ ដល់ ១០', 'Learn numbers from 1 to 10', 'A1', 10, 15, 50, 2, '🔢', '["#E6F5F5", "#1A6B6B"]')
  RETURNING id INTO numbers_lesson_id;

  -- Family lesson
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('family', family_id, 'គ្រួសារ', 'Family', 'រៀនពាក្យអំពីគ្រួសារ', 'Learn words about family', 'A1', 15, 20, 60, 3, '👨‍👩‍👧‍👦', '["#FFE4E9", "#E8913A"]')
  RETURNING id INTO family_lesson_id;

  -- Food lesson
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('food', food_id, 'អាហារ', 'Food', 'រៀនពាក្យអំពីអាហារ', 'Learn words about food', 'A1', 20, 25, 70, 4, '🍜', '["#FFF4E6", "#E8913A"]')
  RETURNING id INTO food_lesson_id;

  -- School lesson (A2)
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('school', school_id, 'សាលារៀន', 'School', 'រៀនពាក្យអំពីសាលារៀន', 'Learn words about school', 'A2', 18, 20, 60, 5, '🏫', '["#E8F5EA", "#4A9B5C"]');

  -- Travel lesson (Premium)
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors, is_premium)
  VALUES ('travel', travel_id, 'ការធ្វើដំណើរ', 'Travel', 'រៀនពាក្យអំពីការធ្វើដំណើរ', 'Learn words about travel', 'B1', 25, 30, 80, 6, '✈️', '["#E6E6FA", "#8B5CF6"]', true);

  -- =============================================
  -- VOCABULARY - Greetings
  -- =============================================

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (greetings_lesson_id, 'Hello', 'សួស្តី', '/suːə.sdiː/', 'Suo s''dei', 'Hello, how are you?', 'សួស្តី អ្នកសុខសប្បាយទេ?', '👋', 1),
  (greetings_lesson_id, 'Goodbye', 'លាសិនហើយ', '/liə sin haəj/', 'Lea sin haey', 'Goodbye, see you tomorrow!', 'លាសិនហើយ ជួបគ្នាថ្ងៃស្អែក!', '👋', 2),
  (greetings_lesson_id, 'Thank you', 'អរគុណ', '/ʔɔː kun/', 'Or kun', 'Thank you very much!', 'អរគុណច្រើន!', '🙏', 3),
  (greetings_lesson_id, 'Please', 'សូម', '/soːm/', 'Som', 'Please help me.', 'សូមជួយខ្ញុំ។', '🙏', 4),
  (greetings_lesson_id, 'Sorry', 'សុំទោស', '/som toːs/', 'Som tos', 'Sorry, I''m late.', 'សុំទោស ខ្ញុំមកយឺត។', '😔', 5),
  (greetings_lesson_id, 'Yes', 'បាទ/ចាស', '/baːt/ /caːs/', 'Bat/Chas', 'Yes, I understand.', 'បាទ ខ្ញុំយល់។', '✅', 6),
  (greetings_lesson_id, 'No', 'ទេ', '/teː/', 'Te', 'No, thank you.', 'ទេ អរគុណ។', '❌', 7),
  (greetings_lesson_id, 'Good morning', 'អរុណសួស្តី', '/ʔaʔ.run suːə.sdiː/', 'Arun suo s''dei', 'Good morning, teacher!', 'អរុណសួស្តី គ្រូ!', '🌅', 8),
  (greetings_lesson_id, 'Good night', 'រាត្រីសួស្តី', '/riət.triː suːə.sdiː/', 'Reatrey suo s''dei', 'Good night, sleep well!', 'រាត្រីសួស្តី គេងលក់ស្រួល!', '🌙', 9),
  (greetings_lesson_id, 'How are you?', 'អ្នកសុខសប្បាយទេ?', '/neak sok sap.baːj teː/', 'Neak sok sabay te?', 'Hello! How are you?', 'សួស្តី! អ្នកសុខសប្បាយទេ?', '😊', 10);

  -- =============================================
  -- VOCABULARY - Numbers
  -- =============================================

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (numbers_lesson_id, 'One', 'មួយ', '/muːəj/', 'Muoy', 'I have one book.', 'ខ្ញុំមានសៀវភៅមួយ។', '1️⃣', 1),
  (numbers_lesson_id, 'Two', 'ពីរ', '/piː/', 'Pii', 'Two apples please.', 'សូមផ្លែប៉ោមពីរ។', '2️⃣', 2),
  (numbers_lesson_id, 'Three', 'បី', '/ɓəj/', 'Bei', 'I see three cats.', 'ខ្ញុំឃើញឆ្មាបី។', '3️⃣', 3),
  (numbers_lesson_id, 'Four', 'បួន', '/ɓuːən/', 'Buon', 'Four seasons.', 'បួនរដូវ។', '4️⃣', 4),
  (numbers_lesson_id, 'Five', 'ប្រាំ', '/pram/', 'Pram', 'Five fingers.', 'ម្រាមដៃប្រាំ។', '5️⃣', 5),
  (numbers_lesson_id, 'Six', 'ប្រាំមួយ', '/pram muːəj/', 'Pram muoy', 'Six months.', 'ប្រាំមួយខែ។', '6️⃣', 6),
  (numbers_lesson_id, 'Seven', 'ប្រាំពីរ', '/pram piː/', 'Pram pii', 'Seven days.', 'ប្រាំពីរថ្ងៃ។', '7️⃣', 7),
  (numbers_lesson_id, 'Eight', 'ប្រាំបី', '/pram ɓəj/', 'Pram bei', 'Eight hours.', 'ប្រាំបីម៉ោង។', '8️⃣', 8),
  (numbers_lesson_id, 'Nine', 'ប្រាំបួន', '/pram ɓuːən/', 'Pram buon', 'Nine students.', 'សិស្សប្រាំបួននាក់។', '9️⃣', 9),
  (numbers_lesson_id, 'Ten', 'ដប់', '/dɑp/', 'Dop', 'Ten years old.', 'អាយុដប់ឆ្នាំ។', '🔟', 10);

  -- =============================================
  -- VOCABULARY - Family
  -- =============================================

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (family_lesson_id, 'Mother', 'ម្តាយ', '/mdaːj/', 'M''day', 'My mother cooks well.', 'ម្តាយខ្ញុំធ្វើម្ហូបឆ្ងាញ់។', '👩', 1),
  (family_lesson_id, 'Father', 'ឪពុក', '/ʔəwpuk/', 'Owpuk', 'My father works hard.', 'ឪពុកខ្ញុំធ្វើការខ្លាំង។', '👨', 2),
  (family_lesson_id, 'Sister', 'បងស្រី', '/ɓɑːŋ srəj/', 'Bong srey', 'My sister is a teacher.', 'បងស្រីខ្ញុំជាគ្រូ។', '👧', 3),
  (family_lesson_id, 'Brother', 'បងប្រុស', '/ɓɑːŋ proh/', 'Bong pros', 'My brother is tall.', 'បងប្រុសខ្ញុំខ្ពស់។', '👦', 4),
  (family_lesson_id, 'Grandmother', 'យាយ', '/jiəj/', 'Yeay', 'Grandmother tells stories.', 'យាយនិទានរឿង។', '👵', 5),
  (family_lesson_id, 'Grandfather', 'តា', '/taː/', 'Ta', 'Grandfather is wise.', 'តាមានប្រាជ្ញា។', '👴', 6),
  (family_lesson_id, 'Aunt', 'មីង', '/miːŋ/', 'Ming', 'My aunt visits often.', 'មីងមកលេងញឹកញាប់។', '👩', 7),
  (family_lesson_id, 'Uncle', 'ពូ', '/puː/', 'Puu', 'Uncle is funny.', 'ពូកំប្លែង។', '👨', 8),
  (family_lesson_id, 'Son', 'កូនប្រុស', '/koːn proh/', 'Kon pros', 'My son is studying.', 'កូនប្រុសខ្ញុំកំពុងរៀន។', '👦', 9),
  (family_lesson_id, 'Daughter', 'កូនស្រី', '/koːn srəj/', 'Kon srey', 'My daughter plays piano.', 'កូនស្រីខ្ញុំលេងព្យាណូ។', '👧', 10);

  -- =============================================
  -- QUIZ QUESTIONS - Greetings
  -- =============================================

  -- Question 1: Multiple choice
  WITH q1 AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (greetings_lesson_id, 'multiple_choice', 'What does "សួស្តី" mean?', 'តើ "សួស្តី" មានន័យថាអ្វី?', 'Hello', 'It''s the most common greeting', 'សួស្តី (suo s''dei) is the Khmer word for "Hello"', '👋', 1)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Hello', 'A', true, 1 FROM q1
  UNION ALL SELECT id, 'Goodbye', 'B', false, 2 FROM q1
  UNION ALL SELECT id, 'Thank you', 'C', false, 3 FROM q1
  UNION ALL SELECT id, 'Please', 'D', false, 4 FROM q1;

  -- Question 2: Multiple choice
  WITH q2 AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (greetings_lesson_id, 'multiple_choice', 'How do you say "Thank you" in Khmer?', 'តើអ្នកនិយាយ "Thank you" ជាភាសាខ្មែរយ៉ាងដូចម្តេច?', 'អរគុណ', 'It starts with "Or"', 'អរគុណ (or kun) means "Thank you" in Khmer', '🙏', 2)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'សួស្តី', 'A', false, 1 FROM q2
  UNION ALL SELECT id, 'អរគុណ', 'B', true, 2 FROM q2
  UNION ALL SELECT id, 'សុំទោស', 'C', false, 3 FROM q2
  UNION ALL SELECT id, 'លាសិនហើយ', 'D', false, 4 FROM q2;

  -- Question 3: Multiple choice
  WITH q3 AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (greetings_lesson_id, 'multiple_choice', 'What is the Khmer word for "Goodbye"?', 'តើពាក្យខ្មែរសម្រាប់ "Goodbye" គឺជាអ្វី?', 'លាសិនហើយ', 'It literally means "leave first already"', 'លាសិនហើយ (lea sin haey) is a common way to say goodbye', '👋', 3)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'អរគុណ', 'A', false, 1 FROM q3
  UNION ALL SELECT id, 'សួស្តី', 'B', false, 2 FROM q3
  UNION ALL SELECT id, 'លាសិនហើយ', 'C', true, 3 FROM q3
  UNION ALL SELECT id, 'សុំទោស', 'D', false, 4 FROM q3;

  -- Question 4: Multiple choice
  WITH q4 AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (greetings_lesson_id, 'multiple_choice', 'How do you say "Sorry" in Khmer?', 'តើអ្នកនិយាយ "Sorry" ជាភាសាខ្មែរយ៉ាងដូចម្តេច?', 'សុំទោស', 'It starts with "Som"', 'សុំទោស (som tos) means "Sorry" or "Excuse me"', '😔', 4)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'បាទ', 'A', false, 1 FROM q4
  UNION ALL SELECT id, 'ទេ', 'B', false, 2 FROM q4
  UNION ALL SELECT id, 'សុំទោស', 'C', true, 3 FROM q4
  UNION ALL SELECT id, 'សូម', 'D', false, 4 FROM q4;

  -- Question 5: Multiple choice
  WITH q5 AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (greetings_lesson_id, 'multiple_choice', 'What does "បាទ" mean?', 'តើ "បាទ" មានន័យថាអ្វី?', 'Yes (male speaker)', 'Used by males to say yes', 'បាទ (bat) is "Yes" used by male speakers', '✅', 5)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'No', 'A', false, 1 FROM q5
  UNION ALL SELECT id, 'Yes (male speaker)', 'B', true, 2 FROM q5
  UNION ALL SELECT id, 'Please', 'C', false, 3 FROM q5
  UNION ALL SELECT id, 'Thank you', 'D', false, 4 FROM q5;

END $$;

-- =============================================
-- ACHIEVEMENTS
-- =============================================

INSERT INTO public.achievements (slug, title_khmer, title_english, description_khmer, description_english, emoji, requirement_type, requirement_value, xp_reward, sort_order) VALUES
('first-lesson', 'មេរៀនដំបូង', 'First Lesson', 'បញ្ចប់មេរៀនដំបូងរបស់អ្នក', 'Complete your first lesson', '🌟', 'lessons_completed', 1, 50, 1),
('streak-7', 'រៀន ៧ ថ្ងៃជាប់គ្នា', '7 Day Streak', 'រៀនរៀងរាល់ថ្ងៃសម្រាប់ ៧ ថ្ងៃ', 'Study every day for 7 days', '🔥', 'streak_days', 7, 100, 2),
('words-100', '១០០ ពាក្យ', '100 Words', 'រៀនពាក្យ ១០០', 'Learn 100 words', '📚', 'words_learned', 100, 150, 3),
('perfect-quiz', 'កម្រងសំណួរល្អឥតខ្ចោះ', 'Perfect Quiz', 'ទទួលបាន ១០០% លើកម្រងសំណួរ', 'Get 100% on a quiz', '⭐', 'quiz_perfect', 1, 75, 4),
('words-500', '៥០០ ពាក្យ', '500 Words', 'រៀនពាក្យ ៥០០', 'Learn 500 words', '💯', 'words_learned', 500, 300, 5),
('streak-30', 'រៀន ៣០ ថ្ងៃជាប់គ្នា', '30 Day Streak', 'រៀនរៀងរាល់ថ្ងៃសម្រាប់ ៣០ ថ្ងៃ', 'Study every day for 30 days', '🏆', 'streak_days', 30, 500, 6);
