-- Training Management System (TMS) Database Schema
-- PostgreSQL Database for Training Management System

-- Create database if not exists (run this separately if needed)
-- CREATE DATABASE tms_db;

-- Set timezone
SET timezone = 'UTC';

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Department table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Role table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tag table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    descriptions TEXT,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User table
CREATE TABLE "tbl_user" (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id INTEGER REFERENCES departments(department_id),
    role_id INTEGER REFERENCES roles(role_id),
    date_of_birth DATE,
    location VARCHAR(100),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    privatekey VARCHAR(255),
    is_admin BOOLEAN DEFAULT true,
    reset_pwd BOOLEAN DEFAULT false,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Tags table
CREATE TABLE user_tags (
    user_tag_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
    UNIQUE(user_id, tag_id)
);

-- URI-Permission table
CREATE TABLE uri_permissions (
    uri_permission_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_permissive BOOLEAN DEFAULT true,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User URI-Permission table
CREATE TABLE user_uri_permissions (
    user_uri_permission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    uri_permission_id INTEGER REFERENCES uri_permissions(uri_permission_id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, uri_permission_id)
);

-- =====================================================
-- TEST MANAGEMENT TABLES
-- =====================================================

-- Test table
CREATE TABLE tests (
    test_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Draft' CHECK (status IN ('Active', 'Draft', 'Archived')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Question table
CREATE TABLE test_questions (
    test_question_id SERIAL PRIMARY KEY,
    test_id INT NOT NULL,
    question TEXT NOT NULL,
    correct_option INT CHECK (correct_option BETWEEN 1 AND 4),
    options JSONB NOT NULL CHECK (jsonb_typeof(options) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(test_id) REFERENCES tests(test_id) ON DELETE CASCADE
);
CREATE INDEX idx_test_question_options ON test_questions USING gin (options jsonb_path_ops);

-- =====================================================
-- ASSIGNMENT MANAGEMENT TABLES
-- =====================================================

-- Assignment table
CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Assignment table
CREATE TABLE user_assignments (
    user_assignment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    assignment_id INT NOT NULL,
    answer TEXT NOT NULL,
    reviews JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(reviews) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE,
    UNIQUE(user_id, assignment_id)
);
CREATE INDEX idx_user_assignment_reviews ON user_assignments USING gin (reviews jsonb_path_ops);

-- =====================================================
-- VIDEO MANAGEMENT TABLES
-- =====================================================

-- Video table
CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    test_id INTEGER REFERENCES tests(test_id),
    assignment_id INTEGER REFERENCES assignments(assignment_id),
    upload_type VARCHAR(20) NOT NULL CHECK (upload_type IN ('youtube', 'file')),
    video_url VARCHAR(500),
    file_name VARCHAR(255),
    file_directory VARCHAR(500),
    audience_tags JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(audience_tags) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_video_audience_tags ON videos USING gin (audience_tags jsonb_path_ops);

-- =====================================================
-- TRAINING MANAGEMENT TABLES
-- =====================================================

-- Training table
CREATE TABLE trainings (
    training_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    videos JSONB DEFAULT '[]'::JSONB NULL CHECK(jsonb_typeof(videos) = 'array'),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tbl_training_videos ON trainings USING gin (videos jsonb_path_ops);

-- User Training table
CREATE TABLE tbl_user_training (
    user_training_id SERIAL PRIMARY KEY,
    training_id INTEGER REFERENCES trainings(training_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    progresses JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(progresses) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(training_id, user_id)
);

-- =====================================================
-- LOGS TABLE FOR DASHBOARD
-- =====================================================

-- Activity Logs table
CREATE TABLE activity_logs (
    activity_log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    action_description TEXT NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- END OF SCHEMA
-- =====================================================
