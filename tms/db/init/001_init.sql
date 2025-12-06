-- TVMS Database Initialization Script
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create additional schemas if needed
-- CREATE SCHEMA IF NOT EXISTS auth;
-- CREATE SCHEMA IF NOT EXISTS public;

-- You can add your initial tables, indexes, and data here
-- Example:
-- CREATE TABLE IF NOT EXISTS users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Add any initial data
-- INSERT INTO users (email, password_hash) VALUES ('admin@tvms.com', 'hashed_password_here');

-- Grant permissions (using actual database and user names)
GRANT ALL PRIVILEGES ON DATABASE tvms_db TO tvms_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tvms_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tvms_user;

CREATE TABLE "tbl_department" (
  "department_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "status" BOOLEAN DEFAULT true,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_role" (
  "role_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "status" BOOLEAN DEFAULT true,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_user" (
  "user_id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "phone" VARCHAR(20),
  "department_id" INTEGER,
  "role_id" INTEGER,
  "date_of_birth" DATE,
  "location" VARCHAR(100),
  "username" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "privatekey" VARCHAR(255),
  "status" VARCHAR(20) DEFAULT 'disabled' CHECK (status IN ('enabled', 'disabled'))
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_group" (
  "group_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "descriptions" TEXT,
  "status" BOOLEAN DEFAULT true,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_group_user" (
  "group_user_id" SERIAL PRIMARY KEY,
  "group_id" INTEGER,
  "user_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_authority" (
  "authority_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "status" BOOLEAN DEFAULT true,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_user_authority" (
  "user_authority_id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "authority_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_test" (
  "test_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "status" VARCHAR(20) DEFAULT 'Draft',
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_test_question" (
  "test_question_id" SERIAL PRIMARY KEY,
  "test_id" INTEGER,
  "question_text" TEXT NOT NULL,
  "question_type" VARCHAR(20) NOT NULL,
  "correct_answer" TEXT NOT NULL,
  "correct_option_key" VARCHAR(10),
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_test_question_option" (
  "test_question_option_id" SERIAL PRIMARY KEY,
  "question_id" INTEGER,
  "option_key" VARCHAR(10) NOT NULL,
  "option_text" TEXT NOT NULL,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_video" (
  "video_id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "status" VARCHAR(20) DEFAULT 'draft',
  "test_id" INTEGER,
  "upload_type" VARCHAR(20) NOT NULL,
  "youtube_url" VARCHAR(500),
  "file_name" VARCHAR(255),
  "file_directory" VARCHAR(500),
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_training" (
  "training_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "status" VARCHAR(20) DEFAULT 'draft',
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modified" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_training_video" (
  "training_video_id" SERIAL PRIMARY KEY,
  "training_id" INTEGER,
  "video_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_training_user" (
  "training_user_id" SERIAL PRIMARY KEY,
  "training_id" INTEGER,
  "user_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_training_group" (
  "training_group_id" SERIAL PRIMARY KEY,
  "training_id" INTEGER,
  "group_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_user_test_answer" (
  "user_test_answer_id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "test_id" INTEGER,
  "question_id" INTEGER,
  "user_answer" TEXT,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_user_training_progress" (
  "user_training_progress_id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "training_id" INTEGER,
  "video_id" INTEGER,
  "is_video_watched" BOOLEAN DEFAULT false,
  "watch_start_time" TIMESTAMP,
  "watch_end_time" TIMESTAMP,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tbl_activity_log" (
  "activity_log_id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "action_type" VARCHAR(50) NOT NULL,
  "action_description" TEXT NOT NULL,
  "entity_type" VARCHAR(50),
  "entity_id" INTEGER,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ON "tbl_group_user" ("group_id", "user_id");

CREATE UNIQUE INDEX ON "tbl_user_authority" ("user_id", "authority_id");

CREATE UNIQUE INDEX ON "tbl_test_question_option" ("question_id", "option_key");

CREATE UNIQUE INDEX ON "tbl_training_video" ("training_id", "video_id");

CREATE UNIQUE INDEX ON "tbl_training_user" ("training_id", "user_id");

CREATE UNIQUE INDEX ON "tbl_training_group" ("training_id", "group_id");

CREATE UNIQUE INDEX ON "tbl_user_training_progress" ("user_id", "training_id", "video_id");

ALTER TABLE "tbl_user" ADD FOREIGN KEY ("department_id") REFERENCES "tbl_department" ("department_id");

ALTER TABLE "tbl_user" ADD FOREIGN KEY ("role_id") REFERENCES "tbl_role" ("role_id");

ALTER TABLE "tbl_group_user" ADD FOREIGN KEY ("group_id") REFERENCES "tbl_group" ("group_id") ON DELETE CASCADE;

ALTER TABLE "tbl_group_user" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_authority" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_authority" ADD FOREIGN KEY ("authority_id") REFERENCES "tbl_authority" ("authority_id") ON DELETE CASCADE;

ALTER TABLE "tbl_test_question" ADD FOREIGN KEY ("test_id") REFERENCES "tbl_test" ("test_id") ON DELETE CASCADE;

ALTER TABLE "tbl_test_question_option" ADD FOREIGN KEY ("question_id") REFERENCES "tbl_test_question" ("test_question_id") ON DELETE CASCADE;

ALTER TABLE "tbl_video" ADD FOREIGN KEY ("test_id") REFERENCES "tbl_test" ("test_id");

ALTER TABLE "tbl_training_video" ADD FOREIGN KEY ("training_id") REFERENCES "tbl_training" ("training_id") ON DELETE CASCADE;

ALTER TABLE "tbl_training_video" ADD FOREIGN KEY ("video_id") REFERENCES "tbl_video" ("video_id") ON DELETE CASCADE;

ALTER TABLE "tbl_training_user" ADD FOREIGN KEY ("training_id") REFERENCES "tbl_training" ("training_id") ON DELETE CASCADE;

ALTER TABLE "tbl_training_user" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE CASCADE;

ALTER TABLE "tbl_training_group" ADD FOREIGN KEY ("training_id") REFERENCES "tbl_training" ("training_id") ON DELETE CASCADE;

ALTER TABLE "tbl_training_group" ADD FOREIGN KEY ("group_id") REFERENCES "tbl_group" ("group_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_test_answer" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_test_answer" ADD FOREIGN KEY ("test_id") REFERENCES "tbl_test" ("test_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_test_answer" ADD FOREIGN KEY ("question_id") REFERENCES "tbl_test_question" ("test_question_id");

ALTER TABLE "tbl_user_training_progress" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_training_progress" ADD FOREIGN KEY ("training_id") REFERENCES "tbl_training" ("training_id") ON DELETE CASCADE;

ALTER TABLE "tbl_user_training_progress" ADD FOREIGN KEY ("video_id") REFERENCES "tbl_video" ("video_id");

ALTER TABLE "tbl_activity_log" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_user" ("user_id") ON DELETE SET NULL;
