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
SELECT 'Administrator'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'Administrator'
);

-- Insert Employee role
INSERT INTO roles (name)
SELECT 'Employee'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'Employee'
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
    SELECT role_id INTO admin_role_id FROM roles WHERE name = 'Administrator' LIMIT 1;

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
            false
        );
    ELSE
        UPDATE users SET 
            password = password_hash,
            privatekey = totp_secret,
            is_admin = true,
            department_id = mgmt_id,
            role_id = admin_role_id,
            reset_pwd = false
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
    SELECT role_id INTO employee_role_id FROM roles WHERE name = 'Employee' LIMIT 1;

    -- Insert User 1 (recently registered - 2 hours ago)
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'user1') THEN
        INSERT INTO users (
            first_name, last_name, email, username, password, privatekey,
            is_admin, employee_id, department_id, role_id, status, join_date, reset_pwd, created
        ) VALUES (
            'Sarah', 'Wilson', 'sarah.wilson@tms.com', 'user1', password_hash, totp_secret,
            false, 'EMP002', dept_a_id, employee_role_id, true, CURRENT_DATE, false,
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
            false, 'EMP003', dept_b_id, employee_role_id, true, CURRENT_DATE, false,
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
            false, 'EMP004', dept_c_id, employee_role_id, true, CURRENT_DATE, false,
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
            false, 'EMP005', dept_a_id, employee_role_id, true, CURRENT_DATE, false,
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
            false, 'EMP006', dept_b_id, employee_role_id, true, CURRENT_DATE, false,
            NOW() - INTERVAL '7 days'
        );
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

-- Insert Sample UserTrainings for Dashboard Testing (Training Completions)
DO $$
DECLARE
    user1_id INTEGER;
    user2_id INTEGER;
    user3_id INTEGER;
    training1_id INTEGER;
    training2_id INTEGER;
    training3_id INTEGER;
BEGIN
    SELECT user_id INTO user1_id FROM users WHERE username = 'user1' LIMIT 1;
    SELECT user_id INTO user2_id FROM users WHERE username = 'user2' LIMIT 1;
    SELECT user_id INTO user3_id FROM users WHERE username = 'user3' LIMIT 1;
    SELECT training_id INTO training1_id FROM trainings WHERE name = 'React基礎トレーニング' LIMIT 1;
    SELECT training_id INTO training2_id FROM trainings WHERE name = 'JavaScript上級コース' LIMIT 1;
    SELECT training_id INTO training3_id FROM trainings WHERE name = 'TypeScript入門' LIMIT 1;

    -- User 1 completed React training (4 hours ago)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user1_id AND training_id = training1_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user1_id, training1_id, '[]'::jsonb,
            NOW() - INTERVAL '4 hours', NOW() - INTERVAL '5 days'
        );
    END IF;

    -- User 2 completed JavaScript training (1 day ago)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user2_id AND training_id = training2_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user2_id, training2_id, '[]'::jsonb,
            NOW() - INTERVAL '1 day', NOW() - INTERVAL '6 days'
        );
    END IF;

    -- User 3 completed TypeScript training (2 days ago)
    IF NOT EXISTS (SELECT 1 FROM user_trainings WHERE user_id = user3_id AND training_id = training3_id) THEN
        INSERT INTO user_trainings (user_id, training_id, progress, modified, created)
        VALUES (
            user3_id, training3_id, '[]'::jsonb,
            NOW() - INTERVAL '2 days', NOW() - INTERVAL '7 days'
        );
    END IF;
END $$;
