UPDATE public.lessons
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(
                content,
                '{whatYouWillLearn,0}',
                to_jsonb('How to stay composed and communicate clearly in the exam room'::text)
              ),
              '{commonMistakes,0,mistake}',
              to_jsonb('Focusing so much on body language that your answer loses clarity'::text)
            ),
            '{commonMistakes,0,correction}',
            to_jsonb('Use comfortable, natural behaviour and focus on speaking clearly'::text)
          ),
          '{commonMistakes,0,explanation}',
          to_jsonb('Body language and eye contact are not IELTS Speaking scoring criteria. Fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation determine the score.'::text)
        ),
        '{miniPractice,0,question}',
        to_jsonb('What is the purpose of the "3-Second Response Drill" in this lesson?'::text)
      ),
      '{miniPractice,0,options}',
      '["Speak for only 3 seconds", "Practise beginning an answer after a short natural pause", "Think for 3 seconds before each word"]'::jsonb
    ),
    '{answerKey,0}',
    to_jsonb('Practise beginning an answer after a short natural pause'::text)
  ),
  '{quickRecap}',
  to_jsonb('In Class 1, practise starting calmly, extending each answer with a clear reason or example, and using thinking phrases sparingly. Your score is based on fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.'::text)
),
updated_at = now()
WHERE id = 'speaking-part1-fluency-confidence';

UPDATE public.lessons
SET content = jsonb_set(
  content,
  '{coreExplanation}',
  to_jsonb(
    replace(
      replace(
        content->>'coreExplanation',
        '1. **Eye Contact**: This indicates transparency and naturally keeps you calm.',
        '1. **Composure**: Sit comfortably, listen carefully, and focus on clear communication. Eye contact and body language are not scoring criteria.'
      ),
      '3. **The 3-Second Rule**: Train yourself to start speaking within 3 seconds of a question.',
      '3. **The 3-Second Response Drill**: As a practice technique, train yourself to begin naturally after a short pause. This is not an official IELTS rule.'
    )
  )
),
updated_at = now()
WHERE id = 'speaking-part1-fluency-confidence';
