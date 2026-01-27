-- Seeder for TMS Database

-- Insert default department if it doesn't exist
INSERT INTO departments (name)
SELECT 'Department A'
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Department A'
);

-- Insert Department B
INSERT INTO departments (name)
SELECT 'Department B'
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Department B'
);

-- Insert Management Department (for admin user)
INSERT INTO departments (name)
SELECT 'Management'
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Management'
);

-- Insert Department C
INSERT INTO departments (name)
SELECT 'Department C'
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Department C'
);

-- Insert default role if it doesn't exist
INSERT INTO roles (name)
SELECT '管理者'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = '管理者'
);

-- Insert Employee role
INSERT INTO roles (name)
SELECT '従業員'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = '従業員'
);

-- Insert Reviewer Roles for Assignment Review Hierarchy
-- These role names match ERoleName enum values in frontend (common/dto/assignmentList.dto.ts)
INSERT INTO roles (name)
SELECT '直属マネージャー'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = '直属マネージャー'
);

INSERT INTO roles (name)
SELECT 'シニアマネージャー'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'シニアマネージャー'
);

INSERT INTO roles (name)
SELECT 'エンパワー部門'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'エンパワー部門'
);

-- Insert Tags
INSERT INTO tags (name, status)
SELECT 'TAG-1', true
WHERE NOT EXISTS (
    SELECT 1 FROM tags WHERE name = 'TAG-1'
);

INSERT INTO tags (name, status)
SELECT 'TAG-2', true
WHERE NOT EXISTS (
    SELECT 1 FROM tags WHERE name = 'TAG-2'
);

INSERT INTO tags (name, status)
SELECT 'TAG-3', true
WHERE NOT EXISTS (
    SELECT 1 FROM tags WHERE name = 'TAG-3'
);

INSERT INTO tags (name, status)
SELECT 'TAG-4', true
WHERE NOT EXISTS (
    SELECT 1 FROM tags WHERE name = 'TAG-4'
);

-- Insert Admin User
-- Password is 'admin123'
-- Username: 'admin' (NOT the email!)
DO $$
DECLARE
    mgmt_id INTEGER;
    admin_role_id INTEGER;
    password_hash TEXT := '$2b$10$QmcQMenMNTd/Hy9ClsdYUO7j81xTwqMHtSi23EoApeS4TrCw9e9ke'; -- Valid hash for 'admin123'
    totp_secret TEXT := 'JBSWY3DPEHPK3PXP'; -- TOTP secret for 2FA
BEGIN
    SELECT department_id INTO mgmt_id FROM departments WHERE name = 'Management' LIMIT 1;
    SELECT role_id INTO admin_role_id FROM roles WHERE name = '管理者' LIMIT 1;

    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin') THEN
        INSERT INTO users (
            first_name, 
            last_name, 
            email, 
            username, 
            password,
            privatekey,
            is_admin, 
            employee_id, 
            department_id, 
            role_id,
            status,
            join_date,
            reset_pwd
        ) VALUES (
            'Admin', 
            'User', 
            'admin@tms.com', 
            'admin', 
            password_hash,
            totp_secret,
            true, 
            'EMP001', 
            mgmt_id,
            admin_role_id,
            true,
            CURRENT_DATE,
            true
        );
    ELSE
        UPDATE users SET 
            password = password_hash,
            privatekey = totp_secret,
            is_admin = true,
            department_id = mgmt_id,
            role_id = admin_role_id,
            reset_pwd = true
        WHERE username = 'admin';
    END IF;
END $$;

-- Insert Sample Users for Dashboard Testing
DO $$
DECLARE
    dept_a_id INTEGER;
    dept_b_id INTEGER;
    dept_c_id INTEGER;
    employee_role_id INTEGER;
    password_hash TEXT := '$2b$10$QmcQMenMNTd/Hy9ClsdYUO7j81xTwqMHtSi23EoApeS4TrCw9e9ke'; -- 'admin123'
    totp_secret TEXT := 'JBSWY3DPEHPK3PXP';
BEGIN
    SELECT department_id INTO dept_a_id FROM departments WHERE name = 'Department A' LIMIT 1;
    SELECT department_id INTO dept_b_id FROM departments WHERE name = 'Department B' LIMIT 1;
    SELECT department_id INTO dept_c_id FROM departments WHERE name = 'Department C' LIMIT 1;
    SELECT role_id INTO employee_role_id FROM roles WHERE name = '従業員' LIMIT 1;

    -- Insert User 1 (recently registered - 2 hours ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user1') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'Sarah', 'Wilson', 'sarah.wilson@tms.com', 'user1', password_hash, totp_secret,
            false, 'EMP002', dept_a_id, employee_role_id, true, CURRENT_DATE, true,
            NOW() - INTERVAL '2 hours'
        );
    END IF;

    -- Insert User 2 (recently registered - 1 day ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user2') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'John', 'Doe', 'john.doe@tms.com', 'user2', password_hash, totp_secret,
            false, 'EMP003', dept_b_id, employee_role_id, true, CURRENT_DATE, true,
            NOW() - INTERVAL '1 day'
        );
    END IF;

    -- Insert User 3 (recently registered - 3 days ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user3') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'Emily', 'Johnson', 'emily.johnson@tms.com', 'user3', password_hash, totp_secret,
            false, 'EMP004', dept_c_id, employee_role_id, true, CURRENT_DATE, true,
            NOW() - INTERVAL '3 days'
        );
    END IF;

    -- Insert User 4 (recently registered - 5 days ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user4') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'Michael', 'Brown', 'michael.brown@tms.com', 'user4', password_hash, totp_secret,
            false, 'EMP005', dept_a_id, employee_role_id, true, CURRENT_DATE, true,
            NOW() - INTERVAL '5 days'
        );
    END IF;

    -- Insert User 5 (recently registered - 1 week ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user5') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'Lisa', 'Anderson', 'lisa.anderson@tms.com', 'user5', password_hash, totp_secret,
            false, 'EMP006', dept_b_id, employee_role_id, true, CURRENT_DATE, true,
            NOW() - INTERVAL '7 days'
        );
    END IF;
END $$;

-- Insert Reviewer Users for Assignment Review Hierarchy
DO $$
DECLARE
    dept_a_id INTEGER;
    dept_b_id INTEGER;
    dept_c_id INTEGER;
    direct_manager_role_id INTEGER;
    senior_manager_role_id INTEGER;
    empowerment_role_id INTEGER;
    password_hash TEXT := '$2b$10$QmcQMenMNTd/Hy9ClsdYUO7j81xTwqMHtSi23EoApeS4TrCw9e9ke'; -- 'admin123'
    totp_secret TEXT := 'JBSWY3DPEHPK3PXP';
BEGIN
    SELECT department_id INTO dept_a_id FROM departments WHERE name = 'Department A' LIMIT 1;
    SELECT department_id INTO dept_b_id FROM departments WHERE name = 'Department B' LIMIT 1;
    SELECT department_id INTO dept_c_id FROM departments WHERE name = 'Department C' LIMIT 1;
    -- Get reviewer role IDs (matching ERoleName enum values)
    SELECT role_id INTO direct_manager_role_id FROM roles WHERE name = '直属マネージャー' LIMIT 1;
    SELECT role_id INTO senior_manager_role_id FROM roles WHERE name = 'シニアマネージャー' LIMIT 1;
    SELECT role_id INTO empowerment_role_id FROM roles WHERE name = 'エンパワー部門' LIMIT 1;

    -- Insert Direct Manager (一次レビュー担当者 - 直属マネージャー)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'direct.manager1') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Takeshi', 'Tanaka', 'takeshi.tanaka@tms.com', 'direct.manager1', password_hash, totp_secret,
            false, 'MGR001', dept_a_id, direct_manager_role_id, true, CURRENT_DATE, true
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'direct.manager2') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Yuki', 'Sato', 'yuki.sato@tms.com', 'direct.manager2', password_hash, totp_secret,
            false, 'MGR002', dept_b_id, direct_manager_role_id, true, CURRENT_DATE, true
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'direct.manager3') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Hiroshi', 'Yamada', 'hiroshi.yamada@tms.com', 'direct.manager3', password_hash, totp_secret,
            false, 'MGR003', dept_c_id, direct_manager_role_id, true, CURRENT_DATE, true
        );
    END IF;

    -- Insert Senior Manager (二次レビュー担当者 - シニアマネージャー)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'senior.manager1') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Kenji', 'Watanabe', 'kenji.watanabe@tms.com', 'senior.manager1', password_hash, totp_secret,
            false, 'SMGR001', dept_a_id, senior_manager_role_id, true, CURRENT_DATE, true
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'senior.manager2') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Naomi', 'Kobayashi', 'naomi.kobayashi@tms.com', 'senior.manager2', password_hash, totp_secret,
            false, 'SMGR002', dept_b_id, senior_manager_role_id, true, CURRENT_DATE, true
        );
    END IF;

    -- Insert Empowerment Department (最終レビュー担当者 - エンパワー部門)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'empowerment1') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Akiko', 'Nakamura', 'akiko.nakamura@tms.com', 'empowerment1', password_hash, totp_secret,
            false, 'EMPW001', dept_a_id, empowerment_role_id, true, CURRENT_DATE, true
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'empowerment2') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd
        ) VALUES (
            'Masato', 'Ito', 'masato.ito@tms.com', 'empowerment2', password_hash, totp_secret,
            false, 'EMPW002', dept_b_id, empowerment_role_id, true, CURRENT_DATE, true
        );
    END IF;
END $$;

-- Set Reviewer Roles in Config Table
-- This is required for getReviewers() API to work
DO $$
DECLARE
    direct_manager_role_id INTEGER;
    senior_manager_role_id INTEGER;
    empowerment_role_id INTEGER;
    reviewer_role_ids INTEGER[];
BEGIN
    -- Get reviewer role IDs
    SELECT role_id INTO direct_manager_role_id FROM roles WHERE name = '直属マネージャー' LIMIT 1;
    SELECT role_id INTO senior_manager_role_id FROM roles WHERE name = 'シニアマネージャー' LIMIT 1;
    SELECT role_id INTO empowerment_role_id FROM roles WHERE name = 'エンパワー部門' LIMIT 1;
    
    -- Build array of reviewer role IDs
    reviewer_role_ids := ARRAY[]::INTEGER[];
    IF direct_manager_role_id IS NOT NULL THEN
        reviewer_role_ids := array_append(reviewer_role_ids, direct_manager_role_id);
    END IF;
    IF senior_manager_role_id IS NOT NULL THEN
        reviewer_role_ids := array_append(reviewer_role_ids, senior_manager_role_id);
    END IF;
    IF empowerment_role_id IS NOT NULL THEN
        reviewer_role_ids := array_append(reviewer_role_ids, empowerment_role_id);
    END IF;
    
    -- Insert or update reviewer roles config
    IF array_length(reviewer_role_ids, 1) > 0 THEN
        INSERT INTO tvms_configs (config_key, config_value)
        VALUES ('reviewer_roles', to_jsonb(reviewer_role_ids))
        ON CONFLICT (config_key) 
        DO UPDATE SET config_value = to_jsonb(reviewer_role_ids);
    END IF;
END $$;

-- Insert Sample Trainings for Dashboard Testing
INSERT INTO trainings (name, description, videos, deadline, status, created)
SELECT 'React基礎トレーニング', 'Reactの基本的な概念と使い方を学ぶトレーニング', '[]'::jsonb, CURRENT_DATE + INTERVAL '30 days', true, NOW() - INTERVAL '10 days'
WHERE NOT EXISTS (SELECT 1 FROM trainings WHERE name = 'React基礎トレーニング');

INSERT INTO trainings (name, description, videos, deadline, status, created)
SELECT 'JavaScript上級コース', '高度なJavaScriptの概念とパターンを学ぶ', '[]'::jsonb, CURRENT_DATE + INTERVAL '45 days', true, NOW() - INTERVAL '8 days'
WHERE NOT EXISTS (SELECT 1 FROM trainings WHERE name = 'JavaScript上級コース');

INSERT INTO trainings (name, description, videos, deadline, status, created)
SELECT 'TypeScript入門', 'TypeScriptの基本から応用まで', '[]'::jsonb, CURRENT_DATE + INTERVAL '20 days', true, NOW() - INTERVAL '5 days'
WHERE NOT EXISTS (SELECT 1 FROM trainings WHERE name = 'TypeScript入門');

INSERT INTO trainings (name, description, videos, deadline, status, created)
SELECT 'Node.jsバックエンド開発', 'Node.jsを使ったサーバーサイド開発', '[]'::jsonb, CURRENT_DATE + INTERVAL '60 days', true, NOW() - INTERVAL '3 days'
WHERE NOT EXISTS (SELECT 1 FROM trainings WHERE name = 'Node.jsバックエンド開発');

INSERT INTO trainings (name, description, videos, deadline, status, created)
SELECT 'データベース設計', 'PostgreSQLを使ったデータベース設計', '[]'::jsonb, CURRENT_DATE + INTERVAL '25 days', true, NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM trainings WHERE name = 'データベース設計');

-- Insert Sample Tests for Dashboard Testing (each video needs a unique test)
INSERT INTO tests (name, description, status, created)
SELECT 'React基礎テスト', 'React基礎トレーニングの理解度を確認するテスト', true, NOW() - INTERVAL '6 days'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'React基礎テスト');

INSERT INTO tests (name, description, status, created)
SELECT 'JavaScript上級テスト', 'JavaScript上級コースの理解度を確認するテスト', true, NOW() - INTERVAL '4 days'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'JavaScript上級テスト');

INSERT INTO tests (name, description, status, created)
SELECT 'TypeScript入門テスト', 'TypeScript入門の理解度を確認するテスト', true, NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'TypeScript入門テスト');

INSERT INTO tests (name, description, status, created)
SELECT 'Node.js開発テスト', 'Node.jsバックエンド開発の理解度を確認するテスト', true, NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'Node.js開発テスト');

-- Additional tests for videos that need unique test_id
INSERT INTO tests (name, description, status, created)
SELECT 'Reactコンポーネントテスト', 'Reactコンポーネント設計の理解度を確認するテスト', true, NOW() - INTERVAL '3 days'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'Reactコンポーネントテスト');

INSERT INTO tests (name, description, status, created)
SELECT 'JavaScript ES6+テスト', 'JavaScript ES6+機能の理解度を確認するテスト', true, NOW() - INTERVAL '4 days'
WHERE NOT EXISTS (SELECT 1 FROM tests WHERE name = 'JavaScript ES6+テスト');

-- Insert Sample Videos for Dashboard Testing
DO $$
DECLARE
    test1_id INTEGER;
    test2_id INTEGER;
    test3_id INTEGER;
    test4_id INTEGER;
    test5_id INTEGER;
    test6_id INTEGER;
BEGIN
    SELECT "testId" INTO test1_id FROM tests WHERE name = 'React基礎テスト' LIMIT 1;
    SELECT "testId" INTO test2_id FROM tests WHERE name = 'JavaScript上級テスト' LIMIT 1;
    SELECT "testId" INTO test3_id FROM tests WHERE name = 'TypeScript入門テスト' LIMIT 1;
    SELECT "testId" INTO test4_id FROM tests WHERE name = 'Node.js開発テスト' LIMIT 1;
    SELECT "testId" INTO test5_id FROM tests WHERE name = 'Reactコンポーネントテスト' LIMIT 1;
    SELECT "testId" INTO test6_id FROM tests WHERE name = 'JavaScript ES6+テスト' LIMIT 1;

    -- Video 1 (recently uploaded - 6 hours ago)
    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'React Hooks入門') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'React Hooks入門', 'React Hooksの基本的な使い方を学ぶ', test1_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'react-hooks-intro.mp4', '/static',
            1800, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-1", "TAG-2"]'::jsonb, true, NOW() - INTERVAL '6 hours'
        );
    END IF;

    -- Video 2 (recently uploaded - 12 hours ago)
    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'JavaScript非同期処理') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'JavaScript非同期処理', 'Promiseとasync/awaitの使い方', test2_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'js-async.mp4', '/static',
            2400, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-2", "TAG-3"]'::jsonb, true, NOW() - INTERVAL '12 hours'
        );
    END IF;

    -- Video 3 (recently uploaded - 1 day ago)
    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'TypeScript型システム') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'TypeScript型システム', 'TypeScriptの型システムの基礎', test3_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ts-types.mp4', '/static',
            2100, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-1", "TAG-4"]'::jsonb, true, NOW() - INTERVAL '1 day'
        );
    END IF;

    -- Video 4 (recently uploaded - 2 days ago)
    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Node.js Express入門') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'Node.js Express入門', 'Express.jsを使ったWebアプリケーション開発', test4_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'express-intro.mp4', '/static',
            2700, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-3", "TAG-4"]'::jsonb, true, NOW() - INTERVAL '2 days'
        );
    END IF;

    -- Additional videos for total count (using unique test_ids)
    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Reactコンポーネント設計') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'Reactコンポーネント設計', '再利用可能なコンポーネントの設計方法', test5_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'react-components.mp4', '/static',
            2000, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-1"]'::jsonb, true, NOW() - INTERVAL '3 days'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM videos WHERE title = 'JavaScript ES6+機能') THEN
        INSERT INTO videos (
            title, description, test_id, assignment_id, upload_type, video_url,
            file_name, file_directory, video_duration, thumbnail_url, audience_tags, status, created
        ) VALUES (
            'JavaScript ES6+機能', 'ES6以降の新機能を学ぶ', test6_id, 1, 'youtube',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'js-es6.mp4', '/static',
            1900, 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            '["TAG-2"]'::jsonb, true, NOW() - INTERVAL '4 days'
        );
    END IF;
END $$;

-- ============================================================================
-- Training Progress Test Data for User Training Counts
-- ============================================================================
-- This section creates test data to verify the training count functionality:
-- - assigned_training: Total number of trainings assigned to a user
-- - completed_training: Number of trainings where ALL videos are COMPLETED
--
-- Test Cases:
-- User 1: 
--   - React基礎トレーニング: COMPLETED (2/2 videos completed) ✓
--   - Node.jsバックエンド開発: COMPLETED (1/1 video completed) ✓
--   Expected: assigned_training = 2, completed_training = 2
--
-- User 2:
--   - JavaScript上級コース: PARTIAL (1/2 videos completed) ✗
--   - TypeScript入門: COMPLETED (1/1 video completed) ✓
--   - Node.jsバックエンド開発: NOT STARTED (0/1 videos) ✗
--   Expected: assigned_training = 3, completed_training = 1
--
-- User 3:
--   - TypeScript入門: NOT STARTED (0/1 videos) ✗
--   - React基礎トレーニング: PARTIAL (1/2 videos completed) ✗
--   Expected: assigned_training = 2, completed_training = 0
-- ============================================================================

-- Insert Sample UserTrainings for Dashboard Testing (Training Completions)
DO $$
DECLARE
    admin_id INTEGER;
    user1_id INTEGER;
    user2_id INTEGER;
    user3_id INTEGER;
    training1_id INTEGER;
    training2_id INTEGER;
    training3_id INTEGER;
    video1_id INTEGER;
    video2_id INTEGER;
    video3_id INTEGER;
    video4_id INTEGER;
BEGIN
    SELECT user_id INTO admin_id FROM users WHERE username = 'admin' LIMIT 1;
    SELECT user_id INTO user1_id FROM users WHERE username = 'user1' LIMIT 1;
    SELECT user_id INTO user2_id FROM users WHERE username = 'user2' LIMIT 1;
    SELECT user_id INTO user3_id FROM users WHERE username = 'user3' LIMIT 1;
    SELECT training_id INTO training1_id FROM trainings WHERE name = 'React基礎トレーニング' LIMIT 1;
    SELECT training_id INTO training2_id FROM trainings WHERE name = 'JavaScript上級コース' LIMIT 1;
    SELECT training_id INTO training3_id FROM trainings WHERE name = 'TypeScript入門' LIMIT 1;

    -- Get video IDs for progress data
    SELECT video_id INTO video1_id FROM videos WHERE title = 'React Hooks入門' LIMIT 1;
    SELECT video_id INTO video2_id FROM videos WHERE title = 'Reactコンポーネント設計' LIMIT 1;
    SELECT video_id INTO video3_id FROM videos WHERE title = 'JavaScript非同期処理' LIMIT 1;
    SELECT video_id INTO video4_id FROM videos WHERE title = 'JavaScript ES6+機能' LIMIT 1;
    
    -- User 1: React training - FULLY COMPLETED (all videos completed)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user1_id AND training_id = training1_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user1_id, training1_id, 
            jsonb_build_array(
                jsonb_build_object(video1_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 1800)),
                jsonb_build_object(video2_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2000))
            ),
            NOW() - INTERVAL '4 hours', NOW() - INTERVAL '5 days'
        );
    END IF;

    -- User 2: JavaScript training - PARTIALLY COMPLETED (only 1 of 2 videos completed)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user2_id AND training_id = training2_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user2_id, training2_id, 
            jsonb_build_array(
                jsonb_build_object(video3_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2400)),
                jsonb_build_object(video4_id::text, jsonb_build_object('status', 'IN_PROGRESS', 'watchDuration', 1200))
            ),
            NOW() - INTERVAL '1 day', NOW() - INTERVAL '6 days'
        );
    END IF;

    -- User 3: TypeScript training - NOT STARTED (no progress)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user3_id AND training_id = training3_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user3_id, training3_id, '[]'::jsonb,
            NOW() - INTERVAL '2 days', NOW() - INTERVAL '7 days'
        );
    END IF;
END $$;

-- Update trainings to include video IDs in videos array for testing
DO $$
DECLARE
    training1_id INTEGER;
    training2_id INTEGER;
    training3_id INTEGER;
    training4_id INTEGER;
    training5_id INTEGER;
    video1_id INTEGER;
    video2_id INTEGER;
    video3_id INTEGER;
    video4_id INTEGER;
    video5_id INTEGER;
    video6_id INTEGER;
BEGIN
    -- Get training IDs
    SELECT training_id INTO training1_id FROM trainings WHERE name = 'React基礎トレーニング' LIMIT 1;
    SELECT training_id INTO training2_id FROM trainings WHERE name = 'JavaScript上級コース' LIMIT 1;
    SELECT training_id INTO training3_id FROM trainings WHERE name = 'TypeScript入門' LIMIT 1;
    SELECT training_id INTO training4_id FROM trainings WHERE name = 'Node.jsバックエンド開発' LIMIT 1;
    SELECT training_id INTO training5_id FROM trainings WHERE name = 'データベース設計' LIMIT 1;
    
    -- Get video IDs
    SELECT video_id INTO video1_id FROM videos WHERE title = 'React Hooks入門' LIMIT 1;
    SELECT video_id INTO video2_id FROM videos WHERE title = 'Reactコンポーネント設計' LIMIT 1;
    SELECT video_id INTO video3_id FROM videos WHERE title = 'JavaScript非同期処理' LIMIT 1;
    SELECT video_id INTO video4_id FROM videos WHERE title = 'JavaScript ES6+機能' LIMIT 1;
    SELECT video_id INTO video5_id FROM videos WHERE title = 'TypeScript型システム' LIMIT 1;
    SELECT video_id INTO video6_id FROM videos WHERE title = 'Node.js Express入門' LIMIT 1;
    
    -- Update React基礎トレーニング: 2 videos (video1, video2) - for user1 to complete
    IF training1_id IS NOT NULL AND video1_id IS NOT NULL AND video2_id IS NOT NULL THEN
        UPDATE trainings 
        SET videos = jsonb_build_array(video1_id, video2_id)
        WHERE training_id = training1_id;
    END IF;
    
    -- Update JavaScript上級コース: 2 videos (video3, video4) - for user2 partial completion
    IF training2_id IS NOT NULL AND video3_id IS NOT NULL AND video4_id IS NOT NULL THEN
        UPDATE trainings 
        SET videos = jsonb_build_array(video3_id, video4_id)
        WHERE training_id = training2_id;
    END IF;
    
    -- Update TypeScript入門: 1 video (video5) - for user3 no progress
    IF training3_id IS NOT NULL AND video5_id IS NOT NULL THEN
        UPDATE trainings 
        SET videos = jsonb_build_array(video5_id)
        WHERE training_id = training3_id;
    END IF;
    
    -- Update Node.jsバックエンド開発: 1 video (video6)
    IF training4_id IS NOT NULL AND video6_id IS NOT NULL THEN
        UPDATE trainings 
        SET videos = jsonb_build_array(video6_id)
        WHERE training_id = training4_id;
    END IF;
END $$;

-- Add more user trainings for comprehensive testing
DO $$
DECLARE
    admin_id INTEGER;
    user1_id INTEGER;
    user2_id INTEGER;
    user3_id INTEGER;
    training1_id INTEGER;
    training3_id INTEGER;
    training4_id INTEGER;
    video1_id INTEGER;
    video2_id INTEGER;
    video5_id INTEGER;
    video6_id INTEGER;
BEGIN
    SELECT user_id INTO admin_id FROM users WHERE username = 'admin' LIMIT 1;
    SELECT user_id INTO user1_id FROM users WHERE username = 'user1' LIMIT 1;
    SELECT user_id INTO user2_id FROM users WHERE username = 'user2' LIMIT 1;
    SELECT user_id INTO user3_id FROM users WHERE username = 'user3' LIMIT 1;
    SELECT training_id INTO training1_id FROM trainings WHERE name = 'React基礎トレーニング' LIMIT 1;
    SELECT training_id INTO training3_id FROM trainings WHERE name = 'TypeScript入門' LIMIT 1;
    SELECT training_id INTO training4_id FROM trainings WHERE name = 'Node.jsバックエンド開発' LIMIT 1;
    SELECT video_id INTO video1_id FROM videos WHERE title = 'React Hooks入門' LIMIT 1;
    SELECT video_id INTO video2_id FROM videos WHERE title = 'Reactコンポーネント設計' LIMIT 1;
    SELECT video_id INTO video5_id FROM videos WHERE title = 'TypeScript型システム' LIMIT 1;
    SELECT video_id INTO video6_id FROM videos WHERE title = 'Node.js Express入門' LIMIT 1;
    
    -- User 1: Node.js training - FULLY COMPLETED (1 video completed)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user1_id AND training_id = training4_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user1_id, training4_id, 
            jsonb_build_array(jsonb_build_object(video6_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2700))),
            NOW() - INTERVAL '2 hours', NOW() - INTERVAL '3 days'
        );
    END IF;
    
    -- User 2: TypeScript training - FULLY COMPLETED (1 video completed)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user2_id AND training_id = training3_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user2_id, training3_id, 
            jsonb_build_array(jsonb_build_object(video5_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2100))),
            NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 days'
        );
    END IF;
    
    -- User 2: Node.js training - NOT STARTED
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user2_id AND training_id = training4_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user2_id, training4_id, '[]'::jsonb,
            NOW() - INTERVAL '1 day', NOW() - INTERVAL '2 days'
        );
    END IF;
    
    -- User 3: React training - PARTIALLY COMPLETED (1 of 2 videos completed)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user3_id AND training_id = training1_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user3_id, training1_id, 
            jsonb_build_array(
                jsonb_build_object(video1_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 1800)),
                jsonb_build_object(video2_id::text, jsonb_build_object('status', 'IN_PROGRESS', 'watchDuration', 800))
            ),
            NOW() - INTERVAL '3 days', NOW() - INTERVAL '8 days'
        );
    END IF;
    
    -- Admin: Add some trainings for testing (optional - for admin user testing)
    IF admin_id IS NOT NULL THEN
        SELECT training_id INTO training1_id FROM trainings WHERE name = 'React基礎トレーニング' LIMIT 1;
        SELECT training_id INTO training4_id FROM trainings WHERE name = 'Node.jsバックエンド開発' LIMIT 1;
        SELECT video_id INTO video1_id FROM videos WHERE title = 'React Hooks入門' LIMIT 1;
        SELECT video_id INTO video2_id FROM videos WHERE title = 'Reactコンポーネント設計' LIMIT 1;
        SELECT video_id INTO video6_id FROM videos WHERE title = 'Node.js Express入門' LIMIT 1;
        
        -- Admin: React training - FULLY COMPLETED
        IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = admin_id AND training_id = training1_id) THEN
            INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
            VALUES (
                admin_id, training1_id, 
                jsonb_build_array(
                    jsonb_build_object(video1_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 1800)),
                    jsonb_build_object(video2_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2000))
                ),
                NOW() - INTERVAL '1 hour', NOW() - INTERVAL '2 days'
            );
        END IF;
        
        -- Admin: Node.js training - FULLY COMPLETED
        IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = admin_id AND training_id = training4_id) THEN
            INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
            VALUES (
                admin_id, training4_id, 
                jsonb_build_array(jsonb_build_object(video6_id::text, jsonb_build_object('status', 'COMPLETED', 'watchDuration', 2700))),
                NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '1 day'
            );
        END IF;
    END IF;
END $$;
