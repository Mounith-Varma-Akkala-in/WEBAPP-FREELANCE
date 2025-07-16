-- Create the lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    duration INTEGER, -- duration in minutes
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the user_lesson_progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, lesson_id) -- Ensure a user can only have one progress entry per lesson
);

-- Create a notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- e.g., 'lesson_completed', 'achievement_unlocked', 'streak_reminder', 'new_challenge'
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update the user_skills table to track overall skill progress and level
ALTER TABLE user_skills
ADD COLUMN IF NOT EXISTS total_lessons_completed INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_exercises_completed INTEGER DEFAULT 0;

-- Create function to update user streak based on lesson progress
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    last_activity_date DATE;
    current_streak INTEGER;
    today DATE := CURRENT_DATE;
    yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
BEGIN
    -- Get the user's last lesson completion date
    SELECT MAX(DATE(completed_at))
    INTO last_activity_date
    FROM user_lesson_progress
    WHERE user_id = p_user_id;

    -- Get current streak from profiles table
    SELECT streak_days INTO current_streak
    FROM profiles
    WHERE id = p_user_id;

    -- Initialize streak if no previous activity
    IF last_activity_date IS NULL THEN
        current_streak := 0;
    ELSIF last_activity_date = today THEN
        -- Activity today, streak already updated or maintained
        -- No change needed for streak count, but ensure it's at least 1 if it was 0
        IF current_streak = 0 THEN
            current_streak := 1;
        END IF;
    ELSIF last_activity_date = yesterday THEN
        -- Activity yesterday, continue streak
        current_streak := COALESCE(current_streak, 0) + 1;
    ELSE
        -- Streak broken, reset to 1 if there's activity today, else 0
        -- This logic assumes this function is called after a lesson is completed today
        current_streak := 1;
    END IF;
    
    -- Update the profile
    UPDATE profiles
    SET streak_days = current_streak
    WHERE id = p_user_id;
    
    RETURN current_streak;
END;
$$ LANGUAGE plpgsql;

-- Function to update user_skills progress based on completed lessons
CREATE OR REPLACE FUNCTION update_skill_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_new_progress INTEGER;
BEGIN
    -- Get total lessons for the skill
    SELECT COUNT(*) INTO v_total_lessons
    FROM lessons
    WHERE skill_id = NEW.skill_id;

    -- Get completed lessons for the user and skill
    SELECT COUNT(*) INTO v_completed_lessons
    FROM user_lesson_progress
    WHERE user_id = NEW.user_id AND skill_id = NEW.skill_id AND completed_at IS NOT NULL;

    -- Calculate new progress percentage
    IF v_total_lessons > 0 THEN
        v_new_progress := ROUND((v_completed_lessons::NUMERIC / v_total_lessons::NUMERIC) * 100);
    ELSE
        v_new_progress := 0;
    END IF;

    -- Update user_skills table
    INSERT INTO user_skills (user_id, skill_id, progress, level, total_lessons_completed, updated_at)
    VALUES (NEW.user_id, NEW.skill_id, v_new_progress, 1, v_completed_lessons, NOW())
    ON CONFLICT (user_id, skill_id) DO UPDATE
    SET progress = EXCLUDED.progress,
        total_lessons_completed = EXCLUDED.total_lessons_completed,
        updated_at = EXCLUDED.updated_at;

    -- Call the streak update function
    PERFORM update_user_streak(NEW.user_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call update_skill_progress after a lesson is marked complete
CREATE OR REPLACE TRIGGER trg_update_skill_progress
AFTER INSERT OR UPDATE OF completed_at ON user_lesson_progress
FOR EACH ROW
EXECUTE FUNCTION update_skill_progress();

-- Insert initial skills (if not already present)
INSERT INTO skills (id, name, description, category, level) VALUES
('1', 'JavaScript Fundamentals', 'Learn the basics of JavaScript programming', 'programming', 'Beginner')
ON CONFLICT (id) DO NOTHING;

INSERT INTO skills (id, name, description, category, level) VALUES
('2', 'Python for Data Science', 'Introduction to Python for data analysis', 'data', 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Insert lessons for JavaScript skill
INSERT INTO lessons (skill_id, title, content, duration, order_index) VALUES
((SELECT id FROM skills WHERE name = 'JavaScript Fundamentals'),
 'Introduction to JavaScript',
 '# Introduction to JavaScript

JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.

## History of JavaScript

JavaScript was created in 1995 by Brendan Eich while he was an engineer at Netscape. JavaScript was first released with Netscape 2 early in 1996. It was originally going to be called LiveScript, but it was renamed in an ill-fated marketing decision that attempted to capitalize on the popularity of Sun Microsystem''s Java language — despite the two having very little in common. This has been a source of confusion ever since.

## Features of JavaScript

- **Lightweight**: JavaScript is a lightweight programming language.
- **Interpreted**: JavaScript is an interpreted language, not a compiled language.
- **Object-Oriented**: JavaScript is an object-oriented language.
- **First-class Functions**: In JavaScript, functions are first-class objects, i.e., they can be passed as arguments to other functions.
- **Case Sensitive**: JavaScript is case sensitive. For example, "myVariable" and "myvariable" are different variables.

## Setting Up Your Environment

You can run JavaScript in:
- **Browser Console**: Press F12 and go to Console tab
- **Online Editors**: CodePen, JSFiddle, or Repl.it
- **Text Editor**: VS Code with Live Server extension

## What You''ll Learn Next

In the upcoming lessons, we''ll cover:
- Variables and data types
- Functions and scope
- DOM manipulation
- Events and user interaction
- Modern JavaScript features

Ready to start your JavaScript journey? Let''s code! 💻✨',
 15, 1),

((SELECT id FROM skills WHERE name = 'JavaScript Fundamentals'),
 'Variables and Data Types',
 '# Variables and Data Types in JavaScript

Variables are containers for storing data values. Think of them as labeled boxes where you can put different types of information! 📦

## Declaring Variables

In JavaScript, there are three ways to declare variables:

### 1. `let` - Block Scoped (Recommended)
```javascript
let userName = "Alice";
let age = 25;
