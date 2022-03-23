USE employee_trackerDB;

INSERT INTO department(name)
VALUES('Accounting'),
('Sales'),
('Marketing'),
('Lawyer'),
('Secretary'),
('Engineering');

INSERT INTO role(title, salary, department_id)
VALUES('Sales Leader', $95000, 1),
('Accounting Manager', $110000, 1),
('Marketing Manager ', $80000, 2),
('Engineering Project Manager', $115000, 2),
('CFO', $97000, 3),
('Office Supernindent', $57000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Mako', 'Mori', 1, null),
('Marta', 'Cabrera', 2, 1),
('Ransom', 'Drysdale', 2, 1),
('Alan', 'Stevens', 3, 3),
('Daniel', 'Craig', 4, 4),
('Chris', 'Evans', 4, 4),
('Ben', 'Bunnang', 5, 5),
('Lakeith', 'Stanfield', 6, 7),
('Joseph', 'Levitt', 6, 7);