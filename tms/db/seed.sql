-- Seeder for TMS Database

-- Insert default department if it doesn't exist
INSERT INTO departments (name)
SELECT 'Department A'
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Department A'
);

-- Insert Department B
INSERT INTO departments (name)
SELECT 'Department '
WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Department B'
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
