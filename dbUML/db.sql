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
CREATE TABLE tbl_department (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Role table
CREATE TABLE tbl_role (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User table
CREATE TABLE tbl_user (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id INTEGER REFERENCES tbl_department(department_id),
    role_id INTEGER REFERENCES tbl_role(role_id),
    tags JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(tags) = 'array'),
    date_of_birth DATE,
    location VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_tags ON tbl_user USING gin (tags jsonb_path_ops);

-- Tag table
CREATE TABLE tbl_tag (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    descriptions TEXT,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- URI-Permission table
CREATE TABLE tbl_uri_permission (
    uri_permission_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT true,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User URI-Permission table
CREATE TABLE tbl_user_uri_permission (
    user_uri_permission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES tbl_user(user_id) ON DELETE CASCADE,
    uri_permission_id INTEGER REFERENCES tbl_uri_permission(uri_permission_id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, uri_permission_id)
);

-- =====================================================
-- TEST MANAGEMENT TABLES
-- =====================================================

-- Test table
CREATE TABLE tbl_test (
    test_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Draft' CHECK (status IN ('Active', 'Draft', 'Archived')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Question table
CREATE TABLE tbl_test_question (
    test_question_id SERIAL PRIMARY KEY,
    test_id INT NOT NULL,
    question TEXT NOT NULL,
    correct_option INT CHECK (correct_option BETWEEN 1 AND 4),
    options JSONB NOT NULL CHECK (jsonb_typeof(options) = 'array'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_test FOREIGN KEY(test_id) REFERENCES tbl_test(test_id) ON DELETE CASCADE
);
CREATE INDEX idx_test_question_options ON tbl_test_question USING gin (options jsonb_path_ops);

-- =====================================================
-- ASSIGNMENT MANAGEMENT TABLES
-- =====================================================

-- Assignment table
CREATE TABLE tbl_assignment (
    assignment_id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Assignment table
CREATE TABLE tbl_user_assignment (
    user_assignment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    assignment_id INT NOT NULL,
    answer TEXT NOT NULL,
    reviews JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(reviews) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES tbl_assignment(assignment_id) ON DELETE CASCADE,
    UNIQUE(user_id, assignment_id)
);
CREATE INDEX idx_user_assignment_reviews ON tbl_user_assignment USING gin (reviews jsonb_path_ops);

-- =====================================================
-- VIDEO MANAGEMENT TABLES
-- =====================================================

-- Video table
CREATE TABLE tbl_video (
    video_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    test_id INTEGER REFERENCES tbl_test(test_id),
    assignment_id INTEGER REFERENCES tbl_assignment(assignment_id),
    upload_type VARCHAR(20) NOT NULL CHECK (upload_type IN ('youtube', 'file')),
    youtube_url VARCHAR(500),
    file_name VARCHAR(255),
    file_directory VARCHAR(500),
    audience_tags JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(audience_tags) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_video_audience_tags ON tbl_video USING gin (audience_tags jsonb_path_ops);

-- =====================================================
-- TRAINING MANAGEMENT TABLES
-- =====================================================

-- Training table
CREATE TABLE tbl_training (
    training_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    videos JSONB DEFAULT '[]'::JSONB NULL CHECK(jsonb_typeof(videos) = 'array'),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tbl_training_videos ON tbl_training USING gin (videos jsonb_path_ops);

-- User Training table
CREATE TABLE tbl_user_training (
    user_training_id SERIAL PRIMARY KEY,
    training_id INTEGER REFERENCES tbl_training(training_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES tbl_user(user_id) ON DELETE CASCADE,
    pregresses JSONB DEFAULT '[]'::JSONB CHECK (jsonb_typeof(pregresses) = 'array'),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(training_id, user_id)
);

-- =====================================================
-- LOGS TABLE FOR DASHBOARD
-- =====================================================

-- Activity Logs table
CREATE TABLE tbl_activity_log (
    activity_log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES tbl_user(user_id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    action_description TEXT NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- END OF SCHEMA
-- =====================================================
