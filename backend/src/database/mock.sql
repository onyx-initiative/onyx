-- DELETE

INSERT INTO Admin (name, email) VALUES ('Michael', 'michael@onyx.com');


INSERT INTO Employer (admin_id, name, contact_email, address, website, description) VALUES
    (1, 'Google', 'test@google.com', '123 Google Street', 'www.google.com', 'Google is a company'),
    (1, 'Facebook', 'test@fb.com', '123 Facebook Street', 'www.facebook.com', 'Facebook is a company'),
    (1, 'Amazon', 'test@amazon.com', '123 Amazon Street', 'www.amazon.com', 'Amazon is a company'),
    (1, 'Apple', 'test@applw.com', '123 Apple Street', 'www.apple.com', 'Apple is a company');

INSERT INTO Job (employer_id, admin_id, title, description, long_description, contact_email, job_type, term, location, applicant_year, deadline, total_views, tags, live) VALUES
    (1, 1, 'Software Engineer', 'Software Engineer', 'Software Engineer', 'test@test.com', 'Full Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (2, 1, 'Business Analyst', 'Business Analyst', 'Business Analyst', 'test@test.com', 'Full Time', 'Permanent', 'Toronto', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (2, 1, 'Business Analyst', 'Business Analyst', 'Business Analyst', 'test@test.com', 'Full Time', 'Permanent', 'New York', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (3, 1, 'Software Engineer', 'Software Engineer', 'Software Engineer', 'test@test.com', 'Full Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (3, 1, 'Full Stack', 'Full Stack', 'Full Stack', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (4, 1, 'Full Stack', 'Full Stack', 'Full Stack', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (4, 1, 'Software Engineer', 'Software Engineer', 'Software Engineer', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (1, 1, 'Software Engineer', 'Software Engineer', 'Software Engineer', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (1, 1, 'Robotics', 'Robotics', 'Robotics', 'test@test.com', 'Full Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (2, 1, 'Robotics', 'Robotics', 'Robotics', 'test@test.com', 'Full Time', 'Permanent', 'Toronto', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (2, 1, 'Robotics', 'Robotics', 'Robotics', 'test@test.com', 'Full Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (3, 1, 'Software Engineer', 'Software Engineer', 'Software Engineer', 'test@test.com', 'Full Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (4, 1, 'Hardware', 'Hardware', 'Hardware', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (1, 1, 'Hardware', 'Hardware', 'Hardware', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE),
    (3, 1, 'Marketing', 'Marketing', 'Marketing', 'test@test.com', 'Part Time', 'Permanent', 'London', '{1,2,3}', '2020-01-01', 0, '{Software, Engineer}', TRUE);

INSERT INTO scholar(name, email, year, school, major, status, notifications) VALUES
    ('Michael', 'mdawes28@gmail.com', 1, 'University of Toronto', 'Computer Science', 'current', TRUE),
    ('Cole', 'cole@gmail.com', 1, 'University of Toronto', 'Computer Science', 'current', TRUE);

INSERT INTO FilterView(scholar_id, view_name, criteria) VALUES
    (1, 'Software Engineer', '{Robotics, Facebook, Toronto}'),
    (1, 'Full Stack', '{Full Stack}'),
    (2, 'NEW YORK', '{New York}');





