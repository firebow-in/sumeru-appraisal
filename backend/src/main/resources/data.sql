-- Sumeru Appraisal Org Chart Data
-- CEO → Manager → HR → Team Structure

-- Insert CEO (no manager)
INSERT INTO employees (name, email, role, department, position, hire_date, phone_number, address, active) 
VALUES ('Abhijeet Ranadhir', 'abhijeet@sumeru.com', 'CEO', 'Management', 'Chief Executive Officer', '2020-01-01', '+91-9876543210', 'Mumbai, India', true);

-- Insert Manager (reports to CEO)
INSERT INTO employees (name, email, role, department, position, hire_date, phone_number, address, active, manager_id) 
VALUES ('Niharika', 'niharika@sumeru.com', 'Manager', 'Operations', 'Operations Manager', '2021-03-15', '+91-9876543211', 'Bangalore, India', true, 1);

-- Insert HR (reports to CEO)
INSERT INTO employees (name, email, role, department, position, hire_date, phone_number, address, active, manager_id) 
VALUES ('Kiran', 'kiran@sumeru.com', 'HR', 'Human Resources', 'HR Manager', '2021-06-01', '+91-9876543212', 'Delhi, India', true, 1);

-- Insert Team Members (all report to Manager - Niharika)
INSERT INTO employees (name, email, role, department, position, hire_date, phone_number, address, active, manager_id) 
VALUES 
('Hanumesh', 'hanumesh@sumeru.com', 'Engineer', 'Development', 'Senior Software Engineer', '2022-01-10', '+91-9876543213', 'Bangalore, India', true, 2),
('Basavaraj', 'basavaraj@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-02-15', '+91-9876543214', 'Bangalore, India', true, 2),
('Karan', 'karan@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-03-20', '+91-9876543215', 'Pune, India', true, 2),
('Bharat', 'bharat@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-04-25', '+91-9876543216', 'Hyderabad, India', true, 2),
('Alvita', 'alvita@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-05-30', '+91-9876543217', 'Chennai, India', true, 2),
('Amarjeet', 'amarjeet@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-06-05', '+91-9876543218', 'Mumbai, India', true, 2),
('Ananya', 'ananya@sumeru.com', 'Engineer', 'Development', 'Software Engineer', '2022-07-10', '+91-9876543219', 'Kolkata, India', true, 2);

-- Insert sample appraisals for the team
INSERT INTO appraisals (employee_id, status, comments, appraisal_date) 
VALUES 
(1, 'Completed', 'Excellent leadership and strategic vision', '2023-12-01'),
(2, 'Completed', 'Strong operational management skills', '2023-12-01'),
(3, 'Completed', 'Outstanding HR management and employee relations', '2023-12-01'),
(4, 'Pending', 'Performance review scheduled', '2024-01-15'),
(5, 'Pending', 'Performance review scheduled', '2024-01-15'),
(6, 'Completed', 'Good technical skills and team collaboration', '2023-12-15'),
(7, 'Pending', 'Performance review scheduled', '2024-01-15'),
(8, 'Completed', 'Excellent problem-solving abilities', '2023-12-15'),
(9, 'Pending', 'Performance review scheduled', '2024-01-15'),
(10, 'Pending', 'Performance review scheduled', '2024-01-15');