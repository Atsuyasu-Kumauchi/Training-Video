-- Training Management System (TMS) Database Schema
-- PostgreSQL Database for Training Management System

-- Create database if not exists (run this separately if needed)
-- CREATE DATABASE tms_db;

-- Set timezone
SET timezone = 'UTC';

-- =====================================================
-- CORE TABLES
-- =====================================================

CREATE TABLE "assignments" (
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "assignmentId" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "question" text,
  PRIMARY KEY ("assignmentId")
);

CREATE TABLE "departments" (
  "department_id" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("department_id")
);

CREATE TABLE "roles" (
  "role_id" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("role_id")
);

CREATE TABLE "tags" (
  "tag_id" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("tag_id")
);

CREATE TABLE "tbl_department" (
  "department_id" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("department_id")
);

CREATE TABLE "tests" (
  "description" text,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "testId" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  PRIMARY KEY ("testId")
);

CREATE TABLE "trainings" (
  "training_id" serial4 NOT NULL,
  "description" text,
  "videos" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "deadline" date,
  "name" varchar(100) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  PRIMARY KEY ("training_id")
);

CREATE TABLE "tvms_configs" (
  "tvmsConfigId" serial4 NOT NULL,
  "config_key" varchar(100) NOT NULL,
  "config_value" jsonb,
  PRIMARY KEY ("tvmsConfigId")
);

CREATE TABLE "uri_permissions" (
  "uri_permission_id" serial4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "is_permissive" bool NOT NULL DEFAULT true,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("uri_permission_id")
);

CREATE TABLE "test_questions" (
  "test_question_id" serial4 NOT NULL,
  "test_id" int4 NOT NULL,
  "correct_option" int4 NOT NULL,
  "options" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "question" varchar NOT NULL,
  PRIMARY KEY ("test_question_id")
);

CREATE TABLE "users" (
  "user_id" serial4 NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(255) NOT NULL,
  "department_id" int4 NOT NULL,
  "role_id" int4 NOT NULL,
  "username" varchar(100) NOT NULL,
  "password" varchar(255) NOT NULL,
  "privatekey" varchar(255) NOT NULL,
  "is_admin" bool NOT NULL DEFAULT false,
  "employee_id" varchar(100) NOT NULL,
  "join_date" date NOT NULL,
  "reset_pwd" bool NOT NULL DEFAULT false,
  "status" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "reviewers" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  PRIMARY KEY ("user_id")
);

CREATE TABLE "videos" (
  "video_id" serial4 NOT NULL,
  "description" text,
  "test_id" int4 NOT NULL,
  "assignment_id" int4 NOT NULL,
  "audience_tags" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "video_duration" int4 NOT NULL,
  "thumbnail_url" varchar NOT NULL,
  "title" varchar(100) NOT NULL,
  "upload_type" varchar NOT NULL,
  "video_url" varchar NOT NULL,
  "file_name" varchar NOT NULL,
  "file_directory" varchar NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  PRIMARY KEY ("video_id")
);

CREATE TABLE "activity_logs" (
  "activity_log_id" serial4 NOT NULL,
  "user_id" int4,
  "action_type" varchar(50) NOT NULL,
  "action_description" text NOT NULL,
  "entity_type" varchar(50),
  "entity_id" int4,
  "created" timestamp DEFAULT (CURRENT_TIMESTAMP),
  PRIMARY KEY ("activity_log_id")
);

CREATE TABLE "user_assignments" (
  "user_id" int4 NOT NULL,
  "created" timestamp NOT NULL DEFAULT (now()),
  "modified" timestamp NOT NULL DEFAULT (now()),
  "userAssignmentId" serial4 NOT NULL,
  "assignmentAssignmentId" int4,
  "answer" varchar NOT NULL,
  "assignment_id" int4 NOT NULL,
  "reviews" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  PRIMARY KEY ("userAssignmentId")
);

CREATE TABLE "user_tags" (
  "user_id" int4 NOT NULL,
  "tag_id" int4 NOT NULL,
  PRIMARY KEY ("user_id", "tag_id")
);

CREATE TABLE "user_trainings" (
  "user_training_id" serial4 NOT NULL,
  "training_id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  "created" timestamp NOT NULL DEFAULT (now()),
  "progress" jsonb NOT NULL DEFAULT ('[]'::jsonb),
  "modified" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("user_training_id")
);

CREATE TABLE "user_uri_permissions" (
  "user_uri_permission_id" serial4 NOT NULL,
  "user_id" int4,
  "uri_permission_id" int4,
  "has_permission" bool NOT NULL DEFAULT true,
  "created" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("user_uri_permission_id")
);

CREATE UNIQUE INDEX "UQ_b43bb700e0840e6390a09c4605e" ON "tvms_configs" ("config_key");

CREATE UNIQUE INDEX "users_employee_id_key" ON "users" ("employee_id");

CREATE UNIQUE INDEX "UQ_680d7a2dda3da5ae440ad7329d1" ON "videos" ("test_id");

CREATE INDEX "IDX_082dadc021168fef6e1afd42ad" ON "user_tags" USING BTREE ("tag_id");

CREATE INDEX "IDX_1876d8f8eff4211b216364381e" ON "user_tags" USING BTREE ("user_id");

CREATE UNIQUE INDEX "UQ_0260f61a7be30d6cc9dcd4a0806" ON "user_uri_permissions" ("user_id", "uri_permission_id");

ALTER TABLE "test_questions" ADD CONSTRAINT "FK_5badfac5ec550e555213ad2e5bc" FOREIGN KEY ("test_id") REFERENCES "tests" ("testId");

ALTER TABLE "users" ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "departments" ("department_id");

ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

ALTER TABLE "videos" ADD CONSTRAINT "FK_680d7a2dda3da5ae440ad7329d1" FOREIGN KEY ("test_id") REFERENCES "tests" ("testId");

ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE SET NULL;

ALTER TABLE "user_assignments" ADD CONSTRAINT "FK_d7f08d4f30bf35eb617d8c7a34e" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "user_assignments" ADD CONSTRAINT "FK_e72f5144307425d467aae722fcf" FOREIGN KEY ("assignmentAssignmentId") REFERENCES "assignments" ("assignmentId");

ALTER TABLE "user_tags" ADD CONSTRAINT "FK_082dadc021168fef6e1afd42ad7" FOREIGN KEY ("tag_id") REFERENCES "tags" ("tag_id");

ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1876d8f8eff4211b216364381ec" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_trainings" ADD CONSTRAINT "FK_7cce7d25be6aefebeb5571ee190" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "user_trainings" ADD CONSTRAINT "FK_7fae5e8f8222af8e91ba69cae10" FOREIGN KEY ("training_id") REFERENCES "trainings" ("training_id");

ALTER TABLE "user_uri_permissions" ADD CONSTRAINT "FK_2374db1bd6cc949b4697f800918" FOREIGN KEY ("uri_permission_id") REFERENCES "uri_permissions" ("uri_permission_id");

ALTER TABLE "user_uri_permissions" ADD CONSTRAINT "FK_d514efe612a4fb8264f3fce4439" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

