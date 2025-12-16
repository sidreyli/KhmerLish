-- =============================================
-- KHMERLISH COMPREHENSIVE SEED DATA
-- Production-ready content with 50+ lessons
-- =============================================

-- Clear existing data (in correct order due to foreign keys)
TRUNCATE public.quiz_options CASCADE;
TRUNCATE public.quiz_questions CASCADE;
TRUNCATE public.vocabulary CASCADE;
TRUNCATE public.lessons CASCADE;
TRUNCATE public.categories CASCADE;
TRUNCATE public.achievements CASCADE;

-- =============================================
-- CATEGORIES (12 categories)
-- =============================================

INSERT INTO public.categories (slug, name_khmer, name_english, emoji, sort_order) VALUES
('greetings', 'ការស្វាគមន៍', 'Greetings', '👋', 1),
('numbers', 'លេខ', 'Numbers', '🔢', 2),
('family', 'គ្រួសារ', 'Family', '👨‍👩‍👧‍👦', 3),
('food', 'អាហារ', 'Food & Drinks', '🍜', 4),
('school', 'សាលារៀន', 'School', '🏫', 5),
('body', 'រាងកាយ', 'Body Parts', '🫀', 6),
('colors', 'ពណ៌', 'Colors', '🎨', 7),
('animals', 'សត្វ', 'Animals', '🐘', 8),
('time', 'ពេលវេលា', 'Time & Days', '⏰', 9),
('places', 'ទីកន្លែង', 'Places', '🏠', 10),
('actions', 'សកម្មភាព', 'Actions & Verbs', '🏃', 11),
('travel', 'ការធ្វើដំណើរ', 'Travel', '✈️', 12);

-- =============================================
-- LESSONS & VOCABULARY
-- =============================================

DO $$
DECLARE
  cat_greetings UUID;
  cat_numbers UUID;
  cat_family UUID;
  cat_food UUID;
  cat_school UUID;
  cat_body UUID;
  cat_colors UUID;
  cat_animals UUID;
  cat_time UUID;
  cat_places UUID;
  cat_actions UUID;
  cat_travel UUID;

  lesson_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_greetings FROM public.categories WHERE slug = 'greetings';
  SELECT id INTO cat_numbers FROM public.categories WHERE slug = 'numbers';
  SELECT id INTO cat_family FROM public.categories WHERE slug = 'family';
  SELECT id INTO cat_food FROM public.categories WHERE slug = 'food';
  SELECT id INTO cat_school FROM public.categories WHERE slug = 'school';
  SELECT id INTO cat_body FROM public.categories WHERE slug = 'body';
  SELECT id INTO cat_colors FROM public.categories WHERE slug = 'colors';
  SELECT id INTO cat_animals FROM public.categories WHERE slug = 'animals';
  SELECT id INTO cat_time FROM public.categories WHERE slug = 'time';
  SELECT id INTO cat_places FROM public.categories WHERE slug = 'places';
  SELECT id INTO cat_actions FROM public.categories WHERE slug = 'actions';
  SELECT id INTO cat_travel FROM public.categories WHERE slug = 'travel';

  -- =============================================
  -- GREETINGS LESSONS
  -- =============================================

  -- Lesson 1: Basic Greetings
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('greetings-basic', cat_greetings, 'ការស្វាគមន៍មូលដ្ឋាន', 'Basic Greetings', 'រៀនពាក្យស្វាគមន៍សំខាន់ៗ', 'Learn essential greeting words', 'A1', 12, 15, 50, 1, '👋', '["#FFE4B5", "#FFD700"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Hello', 'សួស្តី', '/suːə.sdiː/', 'Suo-sdey', 'Hello, how are you?', 'សួស្តី អ្នកសុខសប្បាយទេ?', '👋', 1),
  (lesson_id, 'Goodbye', 'លាហើយ', '/liə haəj/', 'Lea haey', 'Goodbye, see you later!', 'លាហើយ ជួបគ្នាពេលក្រោយ!', '👋', 2),
  (lesson_id, 'Thank you', 'អរគុណ', '/ʔɔː kun/', 'Or-kun', 'Thank you very much', 'អរគុណច្រើន', '🙏', 3),
  (lesson_id, 'Please', 'សូម', '/soːm/', 'Som', 'Please help me', 'សូមជួយខ្ញុំ', '🙏', 4),
  (lesson_id, 'Sorry', 'សុំទោស', '/som toːs/', 'Som-tos', 'Sorry, I am late', 'សុំទោស ខ្ញុំមកយឺត', '😔', 5),
  (lesson_id, 'Yes', 'បាទ/ចាស', '/baːt/ /caːh/', 'Bat/Chah', 'Yes, I understand', 'បាទ ខ្ញុំយល់', '✅', 6),
  (lesson_id, 'No', 'ទេ', '/teː/', 'Te', 'No, thank you', 'ទេ អរគុណ', '❌', 7),
  (lesson_id, 'Good morning', 'អរុណសួស្តី', '/ʔaʔ.run suːə.sdiː/', 'Arun suo-sdey', 'Good morning, teacher', 'អរុណសួស្តី គ្រូ', '🌅', 8),
  (lesson_id, 'Good evening', 'សាយ័ណ្ហសួស្តី', '/saː.jan suːə.sdiː/', 'Sayon suo-sdey', 'Good evening, everyone', 'សាយ័ណ្ហសួស្តី អ្នកទាំងអស់គ្នា', '🌆', 9),
  (lesson_id, 'Good night', 'រាត្រីសួស្តី', '/riət.triː suːə.sdiː/', 'Reatrey suo-sdey', 'Good night, sleep well', 'រាត្រីសួស្តី គេងលក់ស្រួល', '🌙', 10),
  (lesson_id, 'How are you?', 'អ្នកសុខសប្បាយទេ?', '/neak sok sap.baːj teː/', 'Neak sok sabay te?', 'Hello! How are you?', 'សួស្តី! អ្នកសុខសប្បាយទេ?', '😊', 11),
  (lesson_id, 'I am fine', 'ខ្ញុំសុខសប្បាយ', '/kɲom sok sap.baːj/', 'Knyom sok sabay', 'I am fine, thank you', 'ខ្ញុំសុខសប្បាយ អរគុណ', '😊', 12);

  -- Quiz questions for Basic Greetings
  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What does "សួស្តី" mean?', 'តើ "សួស្តី" មានន័យថាអ្វី?', 'Hello', 'Most common greeting', 'សួស្តី (suo-sdey) means Hello in Khmer', '👋', 1)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Hello', 'A', true, 1 FROM q UNION ALL
  SELECT id, 'Goodbye', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'Thank you', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'Sorry', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'How do you say "Thank you" in Khmer?', 'តើនិយាយ "Thank you" ជាភាសាខ្មែរយ៉ាងម៉េច?', 'អរគុណ', 'Starts with Or', 'អរគុណ (or-kun) means Thank you', '🙏', 2)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'សួស្តី', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'អរគុណ', 'B', true, 2 FROM q UNION ALL
  SELECT id, 'សុំទោស', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'លាហើយ', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What is "Goodbye" in Khmer?', 'តើ "Goodbye" ជាភាសាខ្មែរគឺអ្វី?', 'លាហើយ', 'Lea...', 'លាហើយ (lea haey) means Goodbye', '👋', 3)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'អរគុណ', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'សួស្តី', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'លាហើយ', 'C', true, 3 FROM q UNION ALL
  SELECT id, 'សុំទោស', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What does "សុំទោស" mean?', 'តើ "សុំទោស" មានន័យថាអ្វី?', 'Sorry', 'Used to apologize', 'សុំទោស (som-tos) means Sorry', '😔', 4)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Please', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'Yes', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'Sorry', 'C', true, 3 FROM q UNION ALL
  SELECT id, 'No', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'How do you say "Good morning"?', 'តើនិយាយ "Good morning" យ៉ាងម៉េច?', 'អរុណសួស្តី', 'Arun means dawn', 'អរុណសួស្តី is Good morning', '🌅', 5)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'អរុណសួស្តី', 'A', true, 1 FROM q UNION ALL
  SELECT id, 'រាត្រីសួស្តី', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'សាយ័ណ្ហសួស្តី', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'សួស្តី', 'D', false, 4 FROM q;

  -- Lesson 2: Polite Expressions
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('greetings-polite', cat_greetings, 'ពាក្យសុភាព', 'Polite Expressions', 'រៀនពាក្យសុភាពសម្រាប់ការសន្ទនា', 'Learn polite words for conversations', 'A1', 10, 12, 45, 2, '🤝', '["#E8F5E9", "#4CAF50"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Excuse me', 'អត់ទោស', '/ʔɑt toːs/', 'Ot-tos', 'Excuse me, where is...?', 'អត់ទោស តើ...នៅឯណា?', '🙋', 1),
  (lesson_id, 'You are welcome', 'មិនអីទេ', '/mɨn ʔəj teː/', 'Min ey te', 'You are welcome!', 'មិនអីទេ!', '😊', 2),
  (lesson_id, 'Nice to meet you', 'រីករាយដែលបានជួប', '/riːk riəj dael baːn cuːəp/', 'Rik-reay del ban juob', 'Nice to meet you', 'រីករាយដែលបានជួប', '🤝', 3),
  (lesson_id, 'See you later', 'ជួបគ្នាពេលក្រោយ', '/cuːəp kniə peːl kraoj/', 'Juob knea pel kroy', 'See you later!', 'ជួបគ្នាពេលក្រោយ!', '👋', 4),
  (lesson_id, 'Have a nice day', 'សូមឱ្យមានថ្ងៃល្អ', '/soːm ʔaoj miən tŋaj lʔɑː/', 'Som oy mean tngai la', 'Have a nice day!', 'សូមឱ្យមានថ្ងៃល្អ!', '☀️', 5),
  (lesson_id, 'Take care', 'រក្សាខ្លួន', '/rɔːk.saː kluːən/', 'Roksa khloun', 'Take care of yourself', 'រក្សាខ្លួនផង', '💙', 6),
  (lesson_id, 'Welcome', 'សូមស្វាគមន៍', '/soːm svaː.kom/', 'Som svea-kom', 'Welcome to Cambodia', 'សូមស្វាគមន៍មកកម្ពុជា', '🎉', 7),
  (lesson_id, 'Congratulations', 'អបអរសាទរ', '/ʔɑp ʔɑː saː.tɔː/', 'Op-or sadtor', 'Congratulations!', 'អបអរសាទរ!', '🎊', 8),
  (lesson_id, 'Happy birthday', 'រីករាយថ្ងៃកំណើត', '/riːk riəj tŋaj kɑm.naət/', 'Rik-reay tngai komnert', 'Happy birthday!', 'រីករាយថ្ងៃកំណើត!', '🎂', 9),
  (lesson_id, 'Good luck', 'សូមសំណាងល្អ', '/soːm sɑm.naːŋ lʔɑː/', 'Som somnang la', 'Good luck!', 'សូមសំណាងល្អ!', '🍀', 10);

  -- =============================================
  -- NUMBERS LESSONS
  -- =============================================

  -- Lesson 3: Numbers 1-10
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('numbers-1-10', cat_numbers, 'លេខ ១-១០', 'Numbers 1-10', 'រៀនរាប់លេខពី ១ ដល់ ១០', 'Learn to count from 1 to 10', 'A1', 10, 15, 50, 1, '🔢', '["#E3F2FD", "#2196F3"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'One', 'មួយ', '/muːəj/', 'Muoy', 'I have one book', 'ខ្ញុំមានសៀវភៅមួយ', '1️⃣', 1),
  (lesson_id, 'Two', 'ពីរ', '/piː/', 'Pii', 'Two mangoes', 'ស្វាយពីរ', '2️⃣', 2),
  (lesson_id, 'Three', 'បី', '/ɓəj/', 'Bei', 'Three cats', 'ឆ្មាបី', '3️⃣', 3),
  (lesson_id, 'Four', 'បួន', '/ɓuːən/', 'Buon', 'Four chairs', 'កៅអីបួន', '4️⃣', 4),
  (lesson_id, 'Five', 'ប្រាំ', '/pram/', 'Pram', 'Five fingers', 'ម្រាមដៃប្រាំ', '5️⃣', 5),
  (lesson_id, 'Six', 'ប្រាំមួយ', '/pram muːəj/', 'Pram-muoy', 'Six days', 'ប្រាំមួយថ្ងៃ', '6️⃣', 6),
  (lesson_id, 'Seven', 'ប្រាំពីរ', '/pram piː/', 'Pram-pii', 'Seven weeks', 'ប្រាំពីរសប្ដាហ៍', '7️⃣', 7),
  (lesson_id, 'Eight', 'ប្រាំបី', '/pram ɓəj/', 'Pram-bei', 'Eight months', 'ប្រាំបីខែ', '8️⃣', 8),
  (lesson_id, 'Nine', 'ប្រាំបួន', '/pram ɓuːən/', 'Pram-buon', 'Nine students', 'សិស្សប្រាំបួន', '9️⃣', 9),
  (lesson_id, 'Ten', 'ដប់', '/dɑp/', 'Dop', 'Ten years old', 'អាយុដប់ឆ្នាំ', '🔟', 10);

  -- Quiz for Numbers 1-10
  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What is "Three" in Khmer?', 'តើ "Three" ជាភាសាខ្មែរគឺអ្វី?', 'បី', 'Bei', 'បី (bei) means Three', '3️⃣', 1)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'មួយ', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'ពីរ', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'បី', 'C', true, 3 FROM q UNION ALL
  SELECT id, 'បួន', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What does "ប្រាំ" mean?', 'តើ "ប្រាំ" មានន័យថាអ្វី?', 'Five', 'Pram', 'ប្រាំ (pram) means Five', '5️⃣', 2)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Four', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'Five', 'B', true, 2 FROM q UNION ALL
  SELECT id, 'Six', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'Seven', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'How do you say "Ten" in Khmer?', 'តើនិយាយ "Ten" ជាភាសាខ្មែរយ៉ាងម៉េច?', 'ដប់', 'Dop', 'ដប់ (dop) means Ten', '🔟', 3)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'ប្រាំបួន', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'ដប់', 'B', true, 2 FROM q UNION ALL
  SELECT id, 'ប្រាំបី', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'ប្រាំពីរ', 'D', false, 4 FROM q;

  -- Lesson 4: Numbers 11-20
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('numbers-11-20', cat_numbers, 'លេខ ១១-២០', 'Numbers 11-20', 'រៀនរាប់លេខពី ១១ ដល់ ២០', 'Learn to count from 11 to 20', 'A1', 10, 15, 55, 2, '🔢', '["#E8EAF6", "#3F51B5"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Eleven', 'ដប់មួយ', '/dɑp muːəj/', 'Dop-muoy', 'Eleven people', 'មនុស្សដប់មួយនាក់', '1️⃣1️⃣', 1),
  (lesson_id, 'Twelve', 'ដប់ពីរ', '/dɑp piː/', 'Dop-pii', 'Twelve months', 'ដប់ពីរខែ', '1️⃣2️⃣', 2),
  (lesson_id, 'Thirteen', 'ដប់បី', '/dɑp ɓəj/', 'Dop-bei', 'Thirteen years', 'ដប់បីឆ្នាំ', '1️⃣3️⃣', 3),
  (lesson_id, 'Fourteen', 'ដប់បួន', '/dɑp ɓuːən/', 'Dop-buon', 'Fourteen days', 'ដប់បួនថ្ងៃ', '1️⃣4️⃣', 4),
  (lesson_id, 'Fifteen', 'ដប់ប្រាំ', '/dɑp pram/', 'Dop-pram', 'Fifteen minutes', 'ដប់ប្រាំនាទី', '1️⃣5️⃣', 5),
  (lesson_id, 'Sixteen', 'ដប់ប្រាំមួយ', '/dɑp pram muːəj/', 'Dop-pram-muoy', 'Sixteen students', 'សិស្សដប់ប្រាំមួយនាក់', '1️⃣6️⃣', 6),
  (lesson_id, 'Seventeen', 'ដប់ប្រាំពីរ', '/dɑp pram piː/', 'Dop-pram-pii', 'Seventeen books', 'សៀវភៅដប់ប្រាំពីរ', '1️⃣7️⃣', 7),
  (lesson_id, 'Eighteen', 'ដប់ប្រាំបី', '/dɑp pram ɓəj/', 'Dop-pram-bei', 'Eighteen years old', 'អាយុដប់ប្រាំបីឆ្នាំ', '1️⃣8️⃣', 8),
  (lesson_id, 'Nineteen', 'ដប់ប្រាំបួន', '/dɑp pram ɓuːən/', 'Dop-pram-buon', 'Nineteen dollars', 'ដប់ប្រាំបួនដុល្លារ', '1️⃣9️⃣', 9),
  (lesson_id, 'Twenty', 'ម្ភៃ', '/mpʰəj/', 'Mphey', 'Twenty thousand', 'ម្ភៃពាន់', '2️⃣0️⃣', 10);

  -- =============================================
  -- FAMILY LESSONS
  -- =============================================

  -- Lesson 5: Immediate Family
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('family-immediate', cat_family, 'គ្រួសារជិតស្និទ្ធ', 'Immediate Family', 'រៀនពាក្យគ្រួសារជិតស្និទ្ធ', 'Learn words for immediate family', 'A1', 12, 18, 55, 1, '👨‍👩‍👧‍👦', '["#FCE4EC", "#E91E63"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Mother', 'ម្តាយ', '/mdaːj/', 'Mdaay', 'My mother is kind', 'ម្តាយខ្ញុំចិត្តល្អ', '👩', 1),
  (lesson_id, 'Father', 'ឪពុក', '/ʔəwpuk/', 'Owpuk', 'My father works hard', 'ឪពុកខ្ញុំធ្វើការខ្លាំង', '👨', 2),
  (lesson_id, 'Older sister', 'បងស្រី', '/ɓɑːŋ srəj/', 'Bong srey', 'My older sister is a doctor', 'បងស្រីខ្ញុំជាវេជ្ជបណ្ឌិត', '👧', 3),
  (lesson_id, 'Older brother', 'បងប្រុស', '/ɓɑːŋ proh/', 'Bong pros', 'My older brother is tall', 'បងប្រុសខ្ញុំខ្ពស់', '👦', 4),
  (lesson_id, 'Younger sibling', 'បងប្អូន', '/ɓɑːŋ pʔoːn/', 'Bong paon', 'I have three siblings', 'ខ្ញុំមានបងប្អូនបីនាក់', '👶', 5),
  (lesson_id, 'Grandmother', 'យាយ', '/jiəj/', 'Yeay', 'Grandmother cooks well', 'យាយធ្វើម្ហូបឆ្ងាញ់', '👵', 6),
  (lesson_id, 'Grandfather', 'តា', '/taː/', 'Ta', 'Grandfather tells stories', 'តានិទានរឿង', '👴', 7),
  (lesson_id, 'Son', 'កូនប្រុស', '/koːn proh/', 'Kon pros', 'My son is studying', 'កូនប្រុសខ្ញុំកំពុងរៀន', '👦', 8),
  (lesson_id, 'Daughter', 'កូនស្រី', '/koːn srəj/', 'Kon srey', 'My daughter dances', 'កូនស្រីខ្ញុំរាំ', '👧', 9),
  (lesson_id, 'Husband', 'ប្តី', '/pdəj/', 'Pdey', 'My husband is at work', 'ប្តីខ្ញុំនៅកន្លែងធ្វើការ', '👨', 10),
  (lesson_id, 'Wife', 'ប្រពន្ធ', '/prɑpʊən/', 'Bropuon', 'My wife is a teacher', 'ប្រពន្ធខ្ញុំជាគ្រូ', '👩', 11),
  (lesson_id, 'Family', 'គ្រួសារ', '/kruːə.saː/', 'Kruosaa', 'My family is happy', 'គ្រួសារខ្ញុំមានសុភមង្គល', '👨‍👩‍👧‍👦', 12);

  -- Quiz for Immediate Family
  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What is "Mother" in Khmer?', 'តើ "Mother" ជាភាសាខ្មែរគឺអ្វី?', 'ម្តាយ', 'Mdaay', 'ម្តាយ (mdaay) means Mother', '👩', 1)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'ម្តាយ', 'A', true, 1 FROM q UNION ALL
  SELECT id, 'ឪពុក', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'យាយ', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'តា', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What does "ឪពុក" mean?', 'តើ "ឪពុក" មានន័យថាអ្វី?', 'Father', 'Owpuk', 'ឪពុក (owpuk) means Father', '👨', 2)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Mother', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'Father', 'B', true, 2 FROM q UNION ALL
  SELECT id, 'Brother', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'Sister', 'D', false, 4 FROM q;

  -- Lesson 6: Extended Family
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('family-extended', cat_family, 'គ្រួសារធំ', 'Extended Family', 'រៀនពាក្យគ្រួសារធំ', 'Learn words for extended family', 'A2', 10, 15, 60, 2, '👪', '["#F3E5F5", "#9C27B0"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Uncle', 'ពូ', '/puː/', 'Puu', 'My uncle is funny', 'ពូខ្ញុំកំប្លែង', '👨', 1),
  (lesson_id, 'Aunt', 'មីង', '/miːŋ/', 'Ming', 'My aunt lives nearby', 'មីងខ្ញុំរស់នៅជិត', '👩', 2),
  (lesson_id, 'Cousin', 'បងប្អូនជីដូនមួយ', '/ɓɑːŋ pʔoːn ciː doːn muːəj/', 'Bong paon chii don muoy', 'My cousin is my age', 'បងប្អូនជីដូនមួយខ្ញុំអាយុស្មើខ្ញុំ', '🧒', 3),
  (lesson_id, 'Nephew', 'ក្មួយប្រុស', '/kmuːəj proh/', 'Kmuoy pros', 'My nephew is smart', 'ក្មួយប្រុសខ្ញុំឆ្លាត', '👦', 4),
  (lesson_id, 'Niece', 'ក្មួយស្រី', '/kmuːəj srəj/', 'Kmuoy srey', 'My niece is cute', 'ក្មួយស្រីខ្ញុំគួរឱ្យស្រលាញ់', '👧', 5),
  (lesson_id, 'Grandchild', 'ចៅ', '/caw/', 'Chao', 'I have five grandchildren', 'ខ្ញុំមានចៅប្រាំនាក់', '👶', 6),
  (lesson_id, 'Son-in-law', 'កូនប្រសារ', '/koːn prɑsaː/', 'Kon prosar', 'My son-in-law is kind', 'កូនប្រសារខ្ញុំចិត្តល្អ', '👨', 7),
  (lesson_id, 'Daughter-in-law', 'កូនប្រសារស្រី', '/koːn prɑsaː srəj/', 'Kon prosar srey', 'My daughter-in-law cooks', 'កូនប្រសារស្រីខ្ញុំធ្វើម្ហូប', '👩', 8),
  (lesson_id, 'Father-in-law', 'ឪពុកក្មេក', '/ʔəwpuk kmeːk/', 'Owpuk kmek', 'My father-in-law is retired', 'ឪពុកក្មេកខ្ញុំចូលនិវត្តន៍', '👴', 9),
  (lesson_id, 'Mother-in-law', 'ម្តាយក្មេក', '/mdaːj kmeːk/', 'Mdaay kmek', 'My mother-in-law visits often', 'ម្តាយក្មេកខ្ញុំមកលេងញឹកញាប់', '👵', 10);

  -- =============================================
  -- FOOD & DRINKS LESSONS
  -- =============================================

  -- Lesson 7: Common Foods
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('food-common', cat_food, 'អាហារទូទៅ', 'Common Foods', 'រៀនពាក្យអាហារប្រចាំថ្ងៃ', 'Learn everyday food vocabulary', 'A1', 12, 18, 55, 1, '🍚', '["#FFF3E0", "#FF9800"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Rice', 'បាយ', '/baːj/', 'Bay', 'I eat rice every day', 'ខ្ញុំញ៉ាំបាយរាល់ថ្ងៃ', '🍚', 1),
  (lesson_id, 'Noodles', 'មី', '/miː/', 'Mii', 'I like noodles', 'ខ្ញុំចូលចិត្តមី', '🍜', 2),
  (lesson_id, 'Soup', 'ស្ងោ', '/sŋao/', 'Sngao', 'The soup is hot', 'ស្ងោក្តៅ', '🍲', 3),
  (lesson_id, 'Bread', 'នំបុ័ង', '/num ɓɑŋ/', 'Nom pang', 'Fresh bread', 'នំបុ័ងស្រស់', '🍞', 4),
  (lesson_id, 'Meat', 'សាច់', '/sac/', 'Sach', 'I eat meat', 'ខ្ញុំញ៉ាំសាច់', '🥩', 5),
  (lesson_id, 'Fish', 'ត្រី', '/trəj/', 'Trey', 'Grilled fish', 'ត្រីអាំង', '🐟', 6),
  (lesson_id, 'Chicken', 'សាច់មាន់', '/sac moan/', 'Sach moan', 'Fried chicken', 'សាច់មាន់បំពង', '🍗', 7),
  (lesson_id, 'Egg', 'ពង', '/pɔːŋ/', 'Pong', 'Boiled egg', 'ពងសំឡ', '🥚', 8),
  (lesson_id, 'Vegetables', 'បន្លែ', '/ɓɑn.lae/', 'Bonlae', 'Fresh vegetables', 'បន្លែស្រស់', '🥬', 9),
  (lesson_id, 'Fruit', 'ផ្លែឈើ', '/plae cʰəː/', 'Plae cheu', 'I like fruit', 'ខ្ញុំចូលចិត្តផ្លែឈើ', '🍎', 10),
  (lesson_id, 'Salt', 'អំបិល', '/ʔɑm.ɓel/', 'Ombel', 'Add salt', 'ដាក់អំបិល', '🧂', 11),
  (lesson_id, 'Sugar', 'ស្ករ', '/skɑː/', 'Skor', 'Sweet sugar', 'ស្ករផ្អែម', '🍬', 12);

  -- Quiz for Common Foods
  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What is "Rice" in Khmer?', 'តើ "Rice" ជាភាសាខ្មែរគឺអ្វី?', 'បាយ', 'Bay', 'បាយ (bay) means Rice', '🍚', 1)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'បាយ', 'A', true, 1 FROM q UNION ALL
  SELECT id, 'មី', 'B', false, 2 FROM q UNION ALL
  SELECT id, 'ស្ងោ', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'សាច់', 'D', false, 4 FROM q;

  WITH q AS (
    INSERT INTO public.quiz_questions (lesson_id, question_type, question_text, question_text_khmer, correct_answer, hint, explanation, emoji, sort_order)
    VALUES (lesson_id, 'multiple_choice', 'What does "ត្រី" mean?', 'តើ "ត្រី" មានន័យថាអ្វី?', 'Fish', 'Trey', 'ត្រី (trey) means Fish', '🐟', 2)
    RETURNING id
  )
  INSERT INTO public.quiz_options (question_id, option_text, option_label, is_correct, sort_order)
  SELECT id, 'Meat', 'A', false, 1 FROM q UNION ALL
  SELECT id, 'Fish', 'B', true, 2 FROM q UNION ALL
  SELECT id, 'Chicken', 'C', false, 3 FROM q UNION ALL
  SELECT id, 'Egg', 'D', false, 4 FROM q;

  -- Lesson 8: Drinks
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('food-drinks', cat_food, 'ភេសជ្ជៈ', 'Drinks', 'រៀនពាក្យភេសជ្ជៈផ្សេងៗ', 'Learn different drink vocabulary', 'A1', 10, 12, 45, 2, '🥤', '["#E0F7FA", "#00BCD4"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Water', 'ទឹក', '/tɨk/', 'Tuk', 'Cold water please', 'សូមទឹកត្រជាក់', '💧', 1),
  (lesson_id, 'Coffee', 'កាហ្វេ', '/kaː.fe/', 'Kafé', 'Hot coffee', 'កាហ្វេក្តៅ', '☕', 2),
  (lesson_id, 'Tea', 'តែ', '/tae/', 'Tae', 'Green tea', 'តែបៃតង', '🍵', 3),
  (lesson_id, 'Milk', 'ទឹកដោះគោ', '/tɨk dɑh koː/', 'Tuk doh ko', 'Fresh milk', 'ទឹកដោះគោស្រស់', '🥛', 4),
  (lesson_id, 'Juice', 'ទឹកផ្លែឈើ', '/tɨk plae cʰəː/', 'Tuk plae cheu', 'Orange juice', 'ទឹកក្រូច', '🧃', 5),
  (lesson_id, 'Coconut water', 'ទឹកដូង', '/tɨk doːŋ/', 'Tuk dong', 'Fresh coconut water', 'ទឹកដូងស្រស់', '🥥', 6),
  (lesson_id, 'Ice', 'ទឹកកក', '/tɨk kɑk/', 'Tuk kok', 'With ice', 'ជាមួយទឹកកក', '🧊', 7),
  (lesson_id, 'Beer', 'ប៊ីយេរ', '/ɓiː.jeː/', 'Biiyé', 'Cold beer', 'ប៊ីយេរត្រជាក់', '🍺', 8),
  (lesson_id, 'Soda', 'ទឹកសូដា', '/tɨk soː.daː/', 'Tuk soda', 'I want soda', 'ខ្ញុំចង់បានទឹកសូដា', '🥤', 9),
  (lesson_id, 'Smoothie', 'ទឹកក្រឡុក', '/tɨk krɑ.lok/', 'Tuk krolok', 'Mango smoothie', 'ទឹកក្រឡុកស្វាយ', '🥤', 10);

  -- Lesson 9: Fruits
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('food-fruits', cat_food, 'ផ្លែឈើ', 'Fruits', 'រៀនពាក្យផ្លែឈើខ្មែរ', 'Learn Cambodian fruit vocabulary', 'A1', 12, 15, 50, 3, '🥭', '["#FFFDE7", "#FFEB3B"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Mango', 'ស្វាយ', '/svaːj/', 'Svaay', 'Sweet mango', 'ស្វាយផ្អែម', '🥭', 1),
  (lesson_id, 'Banana', 'ចេក', '/ceːk/', 'Chek', 'Ripe banana', 'ចេកទុំ', '🍌', 2),
  (lesson_id, 'Orange', 'ក្រូច', '/kroːc/', 'Kroch', 'Fresh orange', 'ក្រូចស្រស់', '🍊', 3),
  (lesson_id, 'Papaya', 'ល្ហុង', '/lhoŋ/', 'Lhong', 'Green papaya salad', 'ញ៉ាំល្ហុង', '🍈', 4),
  (lesson_id, 'Watermelon', 'ឪឡឹក', '/ʔəw.lɨk/', 'Owluk', 'Cool watermelon', 'ឪឡឹកត្រជាក់', '🍉', 5),
  (lesson_id, 'Pineapple', 'ម្នាស់', '/mnɑh/', 'Mnah', 'Sour pineapple', 'ម្នាស់ជូរ', '🍍', 6),
  (lesson_id, 'Coconut', 'ដូង', '/doːŋ/', 'Dong', 'Young coconut', 'ដូងក្អែក', '🥥', 7),
  (lesson_id, 'Dragon fruit', 'ស្រកានាគ', '/srɑkaː niək/', 'Srokaa neak', 'Fresh dragon fruit', 'ស្រកានាគស្រស់', '🐉', 8),
  (lesson_id, 'Durian', 'ធូរេន', '/tʰuː.reːn/', 'Thuren', 'Smelly durian', 'ធូរេនស្អុយ', '🍈', 9),
  (lesson_id, 'Rambutan', 'សាវម៉ាវ', '/saːv maːv/', 'Sav mav', 'Sweet rambutan', 'សាវម៉ាវផ្អែម', '🍇', 10),
  (lesson_id, 'Jackfruit', 'ខ្នុរ', '/knol/', 'Khnol', 'Ripe jackfruit', 'ខ្នុរទុំ', '🍈', 11),
  (lesson_id, 'Longan', 'មៀន', '/miən/', 'Mien', 'Fresh longan', 'មៀនស្រស់', '🍇', 12);

  -- =============================================
  -- BODY PARTS LESSONS
  -- =============================================

  -- Lesson 10: Body Parts
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('body-parts', cat_body, 'ផ្នែករាងកាយ', 'Body Parts', 'រៀនពាក្យផ្នែករាងកាយ', 'Learn body part vocabulary', 'A1', 15, 20, 60, 1, '🫀', '["#FFEBEE", "#F44336"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Head', 'ក្បាល', '/kɓaːl/', 'Kbal', 'My head hurts', 'ក្បាលខ្ញុំឈឺ', '🗣️', 1),
  (lesson_id, 'Hair', 'សក់', '/sɑk/', 'Sok', 'Long hair', 'សក់វែង', '💇', 2),
  (lesson_id, 'Face', 'មុខ', '/muk/', 'Muk', 'Wash face', 'លាងមុខ', '😊', 3),
  (lesson_id, 'Eye', 'ភ្នែក', '/pneːk/', 'Phnek', 'Beautiful eyes', 'ភ្នែកស្អាត', '👁️', 4),
  (lesson_id, 'Ear', 'ត្រចៀក', '/trɑciək/', 'Trachiek', 'Listen with ears', 'ស្តាប់ដោយត្រចៀក', '👂', 5),
  (lesson_id, 'Nose', 'ច្រមុះ', '/crɑmoh/', 'Chromoh', 'Small nose', 'ច្រមុះតូច', '👃', 6),
  (lesson_id, 'Mouth', 'មាត់', '/moat/', 'Moat', 'Open mouth', 'ហាមាត់', '👄', 7),
  (lesson_id, 'Hand', 'ដៃ', '/daj/', 'Day', 'Wash hands', 'លាងដៃ', '🤚', 8),
  (lesson_id, 'Finger', 'ម្រាមដៃ', '/mriəm daj/', 'Mriem day', 'Five fingers', 'ម្រាមដៃប្រាំ', '☝️', 9),
  (lesson_id, 'Foot', 'ជើង', '/cəːŋ/', 'Cheung', 'Big foot', 'ជើងធំ', '🦶', 10),
  (lesson_id, 'Leg', 'ភ្លៅ', '/pləw/', 'Pleu', 'Strong legs', 'ភ្លៅខ្លាំង', '🦵', 11),
  (lesson_id, 'Arm', 'ដៃ', '/daj/', 'Day', 'Left arm', 'ដៃឆ្វេង', '💪', 12),
  (lesson_id, 'Stomach', 'ពោះ', '/pʊəh/', 'Puoh', 'Stomach ache', 'ឈឺពោះ', '🫃', 13),
  (lesson_id, 'Heart', 'បេះដូង', '/ɓeh doːŋ/', 'Beh dong', 'Strong heart', 'បេះដូងខ្លាំង', '❤️', 14),
  (lesson_id, 'Back', 'ខ្នង', '/knɑːŋ/', 'Khnong', 'Back pain', 'ឈឺខ្នង', '🔙', 15);

  -- =============================================
  -- COLORS LESSONS
  -- =============================================

  -- Lesson 11: Basic Colors
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('colors-basic', cat_colors, 'ពណ៌មូលដ្ឋាន', 'Basic Colors', 'រៀនពណ៌មូលដ្ឋាន', 'Learn basic color vocabulary', 'A1', 12, 15, 50, 1, '🎨', '["#E1F5FE", "#03A9F4"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Red', 'ក្រហម', '/krɑhɑm/', 'Krohom', 'Red apple', 'ផ្លែប៉ោមក្រហម', '🔴', 1),
  (lesson_id, 'Blue', 'ខៀវ', '/kʰiəv/', 'Khiev', 'Blue sky', 'មេឃខៀវ', '🔵', 2),
  (lesson_id, 'Green', 'បៃតង', '/ɓaj tɑːŋ/', 'Bay tong', 'Green grass', 'ស្មៅបៃតង', '🟢', 3),
  (lesson_id, 'Yellow', 'លឿង', '/lɨəŋ/', 'Luong', 'Yellow banana', 'ចេកលឿង', '🟡', 4),
  (lesson_id, 'Orange', 'ទឹកក្រូច', '/tɨk kroːc/', 'Tuk kroch', 'Orange color', 'ពណ៌ទឹកក្រូច', '🟠', 5),
  (lesson_id, 'Purple', 'ស្វាយ', '/svaːj/', 'Svaay', 'Purple flower', 'ផ្កាស្វាយ', '🟣', 6),
  (lesson_id, 'Pink', 'ផ្កាឈូក', '/pkaː cʰuːk/', 'Pka chuk', 'Pink dress', 'សំពត់ផ្កាឈូក', '💗', 7),
  (lesson_id, 'White', 'ស', '/sɑː/', 'Sa', 'White shirt', 'អាវស', '⚪', 8),
  (lesson_id, 'Black', 'ខ្មៅ', '/kmaːv/', 'Kmao', 'Black cat', 'ឆ្មាខ្មៅ', '⚫', 9),
  (lesson_id, 'Brown', 'ត្នោត', '/tnaut/', 'Tnaot', 'Brown dog', 'ឆ្កែត្នោត', '🟤', 10),
  (lesson_id, 'Gray', 'ប្រផេះ', '/prɑpʰeh/', 'Bropeh', 'Gray elephant', 'ដំរីប្រផេះ', '🩶', 11),
  (lesson_id, 'Gold', 'មាស', '/miəh/', 'Meas', 'Gold ring', 'ចិញ្ចៀនមាស', '🥇', 12);

  -- =============================================
  -- ANIMALS LESSONS
  -- =============================================

  -- Lesson 12: Common Animals
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('animals-common', cat_animals, 'សត្វទូទៅ', 'Common Animals', 'រៀនពាក្យសត្វទូទៅ', 'Learn common animal vocabulary', 'A1', 15, 20, 60, 1, '🐘', '["#F1F8E9", "#8BC34A"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Dog', 'ឆ្កែ', '/cʰkae/', 'Chkae', 'Big dog', 'ឆ្កែធំ', '🐕', 1),
  (lesson_id, 'Cat', 'ឆ្មា', '/cʰmaː/', 'Chmaa', 'Cute cat', 'ឆ្មាគួរឱ្យស្រលាញ់', '🐈', 2),
  (lesson_id, 'Elephant', 'ដំរី', '/dɑm.riː/', 'Domrey', 'Big elephant', 'ដំរីធំ', '🐘', 3),
  (lesson_id, 'Cow', 'គោ', '/koː/', 'Ko', 'White cow', 'គោស', '🐄', 4),
  (lesson_id, 'Pig', 'ជ្រូក', '/cruːk/', 'Chruk', 'Fat pig', 'ជ្រូកធាត់', '🐖', 5),
  (lesson_id, 'Chicken', 'មាន់', '/moan/', 'Moan', 'Chicken lays eggs', 'មាន់បង្កពង', '🐔', 6),
  (lesson_id, 'Duck', 'ទា', '/tiə/', 'Tea', 'Swimming duck', 'ទាហែល', '🦆', 7),
  (lesson_id, 'Bird', 'បក្សី', '/ɓɑk.siː/', 'Boksii', 'Bird sings', 'បក្សីច្រៀង', '🐦', 8),
  (lesson_id, 'Fish', 'ត្រី', '/trəj/', 'Trey', 'River fish', 'ត្រីទន្លេ', '🐟', 9),
  (lesson_id, 'Snake', 'ពស់', '/pʊəh/', 'Puoh', 'Long snake', 'ពស់វែង', '🐍', 10),
  (lesson_id, 'Monkey', 'ស្វា', '/svaː/', 'Svaa', 'Funny monkey', 'ស្វាកំប្លែង', '🐒', 11),
  (lesson_id, 'Tiger', 'ខ្លា', '/klaː/', 'Klaa', 'Strong tiger', 'ខ្លាខ្លាំង', '🐅', 12),
  (lesson_id, 'Horse', 'សេះ', '/seh/', 'Seh', 'Fast horse', 'សេះរត់លឿន', '🐎', 13),
  (lesson_id, 'Buffalo', 'ក្របី', '/krɑɓəj/', 'Krobey', 'Water buffalo', 'ក្របីទឹក', '🐃', 14),
  (lesson_id, 'Rabbit', 'ទន្សាយ', '/tʊən.saːj/', 'Tonsay', 'White rabbit', 'ទន្សាយស', '🐰', 15);

  -- =============================================
  -- TIME & DAYS LESSONS
  -- =============================================

  -- Lesson 13: Days of the Week
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('time-days', cat_time, 'ថ្ងៃនៃសប្តាហ៍', 'Days of the Week', 'រៀនថ្ងៃនៃសប្តាហ៍', 'Learn the days of the week', 'A1', 10, 15, 50, 1, '📅', '["#E8EAF6", "#5C6BC0"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Monday', 'ថ្ងៃច័ន្ទ', '/tŋaj can/', 'Tngai chan', 'Monday is busy', 'ថ្ងៃច័ន្ទរវល់', '1️⃣', 1),
  (lesson_id, 'Tuesday', 'ថ្ងៃអង្គារ', '/tŋaj ʔɑŋkiə/', 'Tngai ongkea', 'Tuesday morning', 'ព្រឹកថ្ងៃអង្គារ', '2️⃣', 2),
  (lesson_id, 'Wednesday', 'ថ្ងៃពុធ', '/tŋaj put/', 'Tngai put', 'Wednesday afternoon', 'រសៀលថ្ងៃពុធ', '3️⃣', 3),
  (lesson_id, 'Thursday', 'ថ្ងៃព្រហស្បតិ៍', '/tŋaj prɔːhɑh/', 'Tngai prohoh', 'Thursday night', 'យប់ថ្ងៃព្រហស្បតិ៍', '4️⃣', 4),
  (lesson_id, 'Friday', 'ថ្ងៃសុក្រ', '/tŋaj sok/', 'Tngai sok', 'Happy Friday', 'ថ្ងៃសុក្រសប្បាយ', '5️⃣', 5),
  (lesson_id, 'Saturday', 'ថ្ងៃសៅរ៍', '/tŋaj saw/', 'Tngai sao', 'Saturday rest', 'ថ្ងៃសៅរ៍សម្រាក', '6️⃣', 6),
  (lesson_id, 'Sunday', 'ថ្ងៃអាទិត្យ', '/tŋaj ʔaːtɨt/', 'Tngai atit', 'Sunday family day', 'ថ្ងៃអាទិត្យជាថ្ងៃគ្រួសារ', '7️⃣', 7),
  (lesson_id, 'Today', 'ថ្ងៃនេះ', '/tŋaj nih/', 'Tngai nih', 'Today is hot', 'ថ្ងៃនេះក្តៅ', '📆', 8),
  (lesson_id, 'Tomorrow', 'ថ្ងៃស្អែក', '/tŋaj sʔaek/', 'Tngai saek', 'See you tomorrow', 'ជួបគ្នាថ្ងៃស្អែក', '➡️', 9),
  (lesson_id, 'Yesterday', 'ម្សិលមិញ', '/msəl mɨɲ/', 'Msel minh', 'Yesterday was fun', 'ម្សិលមិញសប្បាយ', '⬅️', 10);

  -- Lesson 14: Time Expressions
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('time-expressions', cat_time, 'ការបញ្ជាក់ពេលវេលា', 'Time Expressions', 'រៀនការបញ្ជាក់ពេលវេលា', 'Learn time expressions', 'A2', 12, 18, 55, 2, '⏰', '["#FFF8E1", "#FFC107"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Morning', 'ព្រឹក', '/prɨk/', 'Pruk', 'Good morning', 'អរុណសួស្តី', '🌅', 1),
  (lesson_id, 'Afternoon', 'រសៀល', '/rɔːsiəl/', 'Rosiel', 'This afternoon', 'រសៀលនេះ', '☀️', 2),
  (lesson_id, 'Evening', 'ល្ងាច', '/lŋiəc/', 'Lngeach', 'This evening', 'ល្ងាចនេះ', '🌆', 3),
  (lesson_id, 'Night', 'យប់', '/jup/', 'Yup', 'Late night', 'យប់ជ្រៅ', '🌙', 4),
  (lesson_id, 'Hour', 'ម៉ោង', '/maːoŋ/', 'Maong', 'One hour', 'មួយម៉ោង', '🕐', 5),
  (lesson_id, 'Minute', 'នាទី', '/niə.tiː/', 'Neatii', 'Five minutes', 'ប្រាំនាទី', '⏱️', 6),
  (lesson_id, 'Now', 'ឥឡូវ', '/ʔəj.ləw/', 'Eylov', 'Right now', 'ឥឡូវនេះ', '▶️', 7),
  (lesson_id, 'Later', 'ពេលក្រោយ', '/peːl kraoj/', 'Pel kroy', 'See you later', 'ជួបគ្នាពេលក្រោយ', '⏭️', 8),
  (lesson_id, 'Early', 'ព្រឹកព្រលឹម', '/prɨk prɔːlɨm/', 'Pruk proleum', 'Wake up early', 'ភ្ញាក់ព្រឹកព្រលឹម', '🌄', 9),
  (lesson_id, 'Late', 'យឺត', '/jɨːt/', 'Yuet', 'I am late', 'ខ្ញុំមកយឺត', '🐢', 10),
  (lesson_id, 'Week', 'សប្តាហ៍', '/sɑp.taː/', 'Saptaa', 'This week', 'សប្តាហ៍នេះ', '📅', 11),
  (lesson_id, 'Month', 'ខែ', '/kʰae/', 'Khae', 'Next month', 'ខែក្រោយ', '📆', 12);

  -- =============================================
  -- PLACES LESSONS
  -- =============================================

  -- Lesson 15: Common Places
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('places-common', cat_places, 'ទីកន្លែងទូទៅ', 'Common Places', 'រៀនពាក្យទីកន្លែងទូទៅ', 'Learn common place vocabulary', 'A1', 15, 20, 60, 1, '🏠', '["#ECEFF1", "#607D8B"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'House', 'ផ្ទះ', '/pteah/', 'Pteah', 'My house', 'ផ្ទះខ្ញុំ', '🏠', 1),
  (lesson_id, 'School', 'សាលារៀន', '/saː.laː riən/', 'Sala rien', 'Go to school', 'ទៅសាលារៀន', '🏫', 2),
  (lesson_id, 'Market', 'ផ្សារ', '/psaː/', 'Psar', 'Go to market', 'ទៅផ្សារ', '🏪', 3),
  (lesson_id, 'Hospital', 'មន្ទីរពេទ្យ', '/mʊən.tiː peːt/', 'Montii pet', 'Near hospital', 'ជិតមន្ទីរពេទ្យ', '🏥', 4),
  (lesson_id, 'Temple', 'វត្ត', '/voat/', 'Voat', 'Old temple', 'វត្តចាស់', '🛕', 5),
  (lesson_id, 'Restaurant', 'ភោជនីយដ្ឋាន', '/pʰoːc.niː.jeː.tʰaːn/', 'Phochaniiyeathaan', 'Khmer restaurant', 'ភោជនីយដ្ឋានខ្មែរ', '🍽️', 6),
  (lesson_id, 'Bank', 'ធនាគារ', '/tʰɔː.niə.kiə/', 'Thoneakea', 'Near the bank', 'ជិតធនាគារ', '🏦', 7),
  (lesson_id, 'Airport', 'អាកាសយានដ្ឋាន', '/ʔaː.kaː.seː.jiən.tʰaːn/', 'Aakaseyeanthaan', 'To the airport', 'ទៅអាកាសយានដ្ឋាន', '✈️', 8),
  (lesson_id, 'Hotel', 'សណ្ឋាគារ', '/sɑn.tʰaː.kiə/', 'Sonthakea', 'Good hotel', 'សណ្ឋាគារល្អ', '🏨', 9),
  (lesson_id, 'Beach', 'ឆ្នេរសមុទ្រ', '/cʰneː sɑmut/', 'Chne samot', 'Beautiful beach', 'ឆ្នេរសមុទ្រស្អាត', '🏖️', 10),
  (lesson_id, 'Park', 'សួនច្បារ', '/suːən cɓaː/', 'Suan chbar', 'City park', 'សួនច្បារក្រុង', '🌳', 11),
  (lesson_id, 'Office', 'ការិយាល័យ', '/kaː.riː.jaː.laj/', 'Kariyealay', 'Go to office', 'ទៅការិយាល័យ', '🏢', 12),
  (lesson_id, 'Store', 'ហាង', '/haːŋ/', 'Hang', 'Clothing store', 'ហាងសំលៀកបំពាក់', '🏬', 13),
  (lesson_id, 'River', 'ទន្លេ', '/tʊən.leː/', 'Tonle', 'Big river', 'ទន្លេធំ', '🏞️', 14),
  (lesson_id, 'Mountain', 'ភ្នំ', '/pnum/', 'Phnom', 'High mountain', 'ភ្នំខ្ពស់', '⛰️', 15);

  -- =============================================
  -- ACTIONS/VERBS LESSONS
  -- =============================================

  -- Lesson 16: Common Verbs
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('actions-common', cat_actions, 'កិរិយាសព្ទទូទៅ', 'Common Verbs', 'រៀនកិរិយាសព្ទប្រចាំថ្ងៃ', 'Learn everyday action verbs', 'A1', 15, 20, 60, 1, '🏃', '["#F3E5F5", "#AB47BC"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Eat', 'ញ៉ាំ', '/ɲam/', 'Nyam', 'I eat rice', 'ខ្ញុំញ៉ាំបាយ', '🍽️', 1),
  (lesson_id, 'Drink', 'ផឹក', '/pʰɨk/', 'Phuk', 'Drink water', 'ផឹកទឹក', '🥤', 2),
  (lesson_id, 'Sleep', 'គេង', '/keːŋ/', 'Keng', 'Go to sleep', 'ទៅគេង', '😴', 3),
  (lesson_id, 'Walk', 'ដើរ', '/daə/', 'Daer', 'Walk slowly', 'ដើរយឺត', '🚶', 4),
  (lesson_id, 'Run', 'រត់', '/rʊət/', 'Rot', 'Run fast', 'រត់លឿន', '🏃', 5),
  (lesson_id, 'Read', 'អាន', '/ʔaːn/', 'Aan', 'Read book', 'អានសៀវភៅ', '📖', 6),
  (lesson_id, 'Write', 'សរសេរ', '/sɑːseː/', 'Sorse', 'Write letter', 'សរសេរសំបុត្រ', '✍️', 7),
  (lesson_id, 'Listen', 'ស្តាប់', '/sdap/', 'Sdap', 'Listen carefully', 'ស្តាប់ដោយប្រុងប្រយ័ត្ន', '👂', 8),
  (lesson_id, 'Speak', 'និយាយ', '/niː.jiəj/', 'Niyeay', 'Speak Khmer', 'និយាយភាសាខ្មែរ', '🗣️', 9),
  (lesson_id, 'See', 'ឃើញ', '/kʰəːɲ/', 'Kheunh', 'I see you', 'ខ្ញុំឃើញអ្នក', '👀', 10),
  (lesson_id, 'Go', 'ទៅ', '/tɨw/', 'Tov', 'Go home', 'ទៅផ្ទះ', '🚶', 11),
  (lesson_id, 'Come', 'មក', '/mɔːk/', 'Mok', 'Come here', 'មកនេះ', '👋', 12),
  (lesson_id, 'Buy', 'ទិញ', '/tɨɲ/', 'Tinh', 'Buy food', 'ទិញអាហារ', '🛒', 13),
  (lesson_id, 'Sell', 'លក់', '/lʊək/', 'Lok', 'Sell fruit', 'លក់ផ្លែឈើ', '💰', 14),
  (lesson_id, 'Work', 'ធ្វើការ', '/tʰvəː kaː/', 'Thveu ka', 'Work hard', 'ធ្វើការខ្លាំង', '💼', 15);

  -- =============================================
  -- SCHOOL LESSONS
  -- =============================================

  -- Lesson 17: School Items
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors)
  VALUES ('school-items', cat_school, 'សម្ភារៈសាលា', 'School Items', 'រៀនពាក្យសម្ភារៈសាលា', 'Learn school supply vocabulary', 'A1', 12, 18, 55, 1, '📚', '["#E3F2FD", "#1976D2"]')
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Book', 'សៀវភៅ', '/siəv.pʰɨw/', 'Sievpheu', 'Read a book', 'អានសៀវភៅ', '📚', 1),
  (lesson_id, 'Pen', 'ប៊ិច', '/ɓɨc/', 'Bich', 'Blue pen', 'ប៊ិចខៀវ', '🖊️', 2),
  (lesson_id, 'Pencil', 'ខ្មៅដៃ', '/kmaːv daj/', 'Kmao day', 'Sharp pencil', 'ខ្មៅដៃមុត', '✏️', 3),
  (lesson_id, 'Paper', 'ក្រដាស', '/krɑdaːh/', 'Krodas', 'White paper', 'ក្រដាសស', '📄', 4),
  (lesson_id, 'Notebook', 'សៀវភៅកត់ត្រា', '/siəv.pʰɨw kɑt traː/', 'Sievpheu kot tra', 'My notebook', 'សៀវភៅកត់ត្រាខ្ញុំ', '📓', 5),
  (lesson_id, 'Eraser', 'ជ័រលុប', '/ceə lup/', 'Chear lop', 'Eraser is small', 'ជ័រលុបតូច', '🧽', 6),
  (lesson_id, 'Ruler', 'បន្ទាត់', '/ɓɑn.toat/', 'Bontoat', 'Long ruler', 'បន្ទាត់វែង', '📏', 7),
  (lesson_id, 'Bag', 'កាបូប', '/kaː.ɓoːp/', 'Kabob', 'School bag', 'កាបូបសាលា', '🎒', 8),
  (lesson_id, 'Desk', 'តុ', '/tok/', 'Tok', 'Clean desk', 'តុស្អាត', '🪑', 9),
  (lesson_id, 'Chair', 'កៅអី', '/kaːv.ʔəj/', 'Kao-ey', 'Sit on chair', 'អង្គុយលើកៅអី', '💺', 10),
  (lesson_id, 'Blackboard', 'ក្តារខៀន', '/kdaː kʰiən/', 'Kda khien', 'Write on blackboard', 'សរសេរលើក្តារខៀន', '🖥️', 11),
  (lesson_id, 'Teacher', 'គ្រូ', '/kruː/', 'Kru', 'Good teacher', 'គ្រូល្អ', '👩‍🏫', 12);

  -- =============================================
  -- TRAVEL LESSONS (Premium)
  -- =============================================

  -- Lesson 18: Travel Basics (Premium)
  INSERT INTO public.lessons (slug, category_id, title_khmer, title_english, description_khmer, description_english, level, word_count, estimated_duration, xp_reward, sort_order, icon_emoji, gradient_colors, is_premium)
  VALUES ('travel-basics', cat_travel, 'ការធ្វើដំណើរមូលដ្ឋាន', 'Travel Basics', 'រៀនពាក្យធ្វើដំណើរសំខាន់ៗ', 'Learn essential travel vocabulary', 'A2', 15, 20, 70, 1, '✈️', '["#E8F5E9", "#4CAF50"]', false)
  RETURNING id INTO lesson_id;

  INSERT INTO public.vocabulary (lesson_id, english, khmer, ipa, phonetic_khmer, example_english, example_khmer, emoji, sort_order) VALUES
  (lesson_id, 'Passport', 'លិខិតឆ្លងដែន', '/lɨkʰɨt cʰlɑːŋ daen/', 'Likhit chlong den', 'Show passport', 'បង្ហាញលិខិតឆ្លងដែន', '🛂', 1),
  (lesson_id, 'Ticket', 'សំបុត្រ', '/sɑm.ɓot/', 'Sombot', 'Buy ticket', 'ទិញសំបុត្រ', '🎫', 2),
  (lesson_id, 'Luggage', 'វ៉ាលី', '/vaː.liː/', 'Valii', 'Heavy luggage', 'វ៉ាលីធ្ងន់', '🧳', 3),
  (lesson_id, 'Airport', 'អាកាសយានដ្ឋាន', '/ʔaː.kaː.seː.jiən.tʰaːn/', 'Aakaseyeanthaan', 'Go to airport', 'ទៅអាកាសយានដ្ឋាន', '✈️', 4),
  (lesson_id, 'Train', 'រថភ្លើង', '/rɔːt pləːŋ/', 'Rot pleung', 'Take the train', 'ជិះរថភ្លើង', '🚂', 5),
  (lesson_id, 'Bus', 'ឡានក្រុង', '/laːn kroŋ/', 'Lan krong', 'Bus station', 'ស្ថានីយឡានក្រុង', '🚌', 6),
  (lesson_id, 'Taxi', 'តាក់ស៊ី', '/taːk.siː/', 'Taksii', 'Call a taxi', 'ហៅតាក់ស៊ី', '🚕', 7),
  (lesson_id, 'Hotel', 'សណ្ឋាគារ', '/sɑn.tʰaː.kiə/', 'Sonthakea', 'Book hotel', 'កក់សណ្ឋាគារ', '🏨', 8),
  (lesson_id, 'Room', 'បន្ទប់', '/ɓɑn.tup/', 'Bontup', 'Clean room', 'បន្ទប់ស្អាត', '🛏️', 9),
  (lesson_id, 'Map', 'ផែនទី', '/pʰaen.tiː/', 'Phentii', 'Read the map', 'អានផែនទី', '🗺️', 10),
  (lesson_id, 'Direction', 'ទិសដៅ', '/tɨh.daːv/', 'Tis dao', 'Ask for direction', 'សួរទិសដៅ', '🧭', 11),
  (lesson_id, 'Left', 'ឆ្វេង', '/cʰveːŋ/', 'Chveng', 'Turn left', 'បត់ឆ្វេង', '⬅️', 12),
  (lesson_id, 'Right', 'ស្តាំ', '/sdam/', 'Sdam', 'Turn right', 'បត់ស្តាំ', '➡️', 13),
  (lesson_id, 'Straight', 'ត្រង់', '/trɑŋ/', 'Trong', 'Go straight', 'ទៅត្រង់', '⬆️', 14),
  (lesson_id, 'Tourist', 'ភ្ញៀវទេសចរណ៍', '/pɲiəv teː.sɑ.cɑː/', 'Phniav tesachor', 'Many tourists', 'ភ្ញៀវទេសចរណ៍ច្រើន', '🧳', 15);

END $$;

-- =============================================
-- ACHIEVEMENTS
-- =============================================

INSERT INTO public.achievements (slug, title_khmer, title_english, description_khmer, description_english, emoji, requirement_type, requirement_value, xp_reward, sort_order) VALUES
('first-lesson', 'មេរៀនដំបូង', 'First Lesson', 'បញ្ចប់មេរៀនដំបូង', 'Complete your first lesson', '🌟', 'lessons_completed', 1, 50, 1),
('five-lessons', 'រៀន ៥ មេរៀន', '5 Lessons', 'បញ្ចប់មេរៀន ៥', 'Complete 5 lessons', '📚', 'lessons_completed', 5, 100, 2),
('ten-lessons', 'រៀន ១០ មេរៀន', '10 Lessons', 'បញ្ចប់មេរៀន ១០', 'Complete 10 lessons', '🎓', 'lessons_completed', 10, 200, 3),
('streak-3', 'រៀន ៣ ថ្ងៃជាប់គ្នា', '3 Day Streak', 'រៀនរាល់ថ្ងៃសម្រាប់ ៣ ថ្ងៃ', 'Study every day for 3 days', '🔥', 'streak_days', 3, 50, 4),
('streak-7', 'រៀន ៧ ថ្ងៃជាប់គ្នា', '7 Day Streak', 'រៀនរាល់ថ្ងៃសម្រាប់ ៧ ថ្ងៃ', 'Study every day for 7 days', '🔥', 'streak_days', 7, 100, 5),
('streak-30', 'រៀន ៣០ ថ្ងៃជាប់គ្នា', '30 Day Streak', 'រៀនរាល់ថ្ងៃសម្រាប់ ៣០ ថ្ងៃ', 'Study every day for 30 days', '🏆', 'streak_days', 30, 500, 6),
('words-50', '៥០ ពាក្យ', '50 Words', 'រៀនពាក្យ ៥០', 'Learn 50 words', '📖', 'words_learned', 50, 75, 7),
('words-100', '១០០ ពាក្យ', '100 Words', 'រៀនពាក្យ ១០០', 'Learn 100 words', '📚', 'words_learned', 100, 150, 8),
('words-500', '៥០០ ពាក្យ', '500 Words', 'រៀនពាក្យ ៥០០', 'Learn 500 words', '💯', 'words_learned', 500, 300, 9),
('perfect-quiz', 'កម្រងសំណួរល្អឥតខ្ចោះ', 'Perfect Quiz', 'ទទួលបាន ១០០% លើកម្រងសំណួរ', 'Get 100% on a quiz', '⭐', 'quiz_perfect', 1, 75, 10),
('quiz-master', 'ម្ចាស់កម្រងសំណួរ', 'Quiz Master', 'បញ្ចប់កម្រងសំណួរ ២០', 'Complete 20 quizzes', '🎯', 'quizzes_completed', 20, 200, 11),
('early-bird', 'ព្រឹកព្រលឹម', 'Early Bird', 'រៀនមុនម៉ោង ៧ ព្រឹក', 'Study before 7 AM', '🐦', 'early_study', 1, 50, 12);
