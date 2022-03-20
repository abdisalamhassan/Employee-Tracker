USE company_db;

INSERT INTO departments(name)
VALUES('Accounting'),
('Sales'),
('Marketing'),
('Lawyer'),
('Secretary')
('Enginerring');

INSERT INTO roles(title, salary, department_id)
VALUES('Sales Leader', 74894.47, 1),
('Accounting', 59486.86, 1),
('Marketing ', 89372.64, 2),
('Engineering, 53967.55, 2),
('Lawyer', 93758.54, 3),
('Secretary', 49583.55, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Mako', 'Mori', 1, ),
('Marta', 'Cabrera', 2, 1),
('Ransom', 'Drysdale', 2, 1),
('Alan', 'Stevens', 3, ),
('Daniel', 'Craig', 4, 4),
('Chris', 'Evans', 4, 4),
('Ben', 'Bunnang', 5, ),
('Lakeith', 'Stanfield', 6, 7),
('Joseph', 'Levitt', 6, 7);