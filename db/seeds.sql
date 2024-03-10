INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('IT Service Management'),
       ('Hospitality'),
       ('Human Resources'),
       ('Executive Leadership');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3),
       ('Sales Lead', 100000, 4),
       ('Salesperson', 80000, 4),
       ('Support Analyst', 550000, 5),
       ('Service Director', 90000, 5),
       ('Meeting Coordinator', 80000, 6),
       ('Office Manager', 75000, 6),
       ('HR Manager', 150000, 7),
       ('Compensation and Benefits', 90000, 7),
       ('Chief Executive Officer', 500000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Winnie', 'Harlow', 1, 15),
       ('Bowie', 'Scar', 2, 1),
       ('Lisa', 'Ranaste', 3, 15),
       ('Ryan', 'Halim', 4, 3),
       ('Analise', 'Perciple', 5, 15),
       ('Danny', 'Beterburs', 6, 5),
       ('Needa', 'Alla', 7, 15),
       ('Harry', 'Gotche', 8, 7),
       ('Scott', 'Clarke', 9, 10),
       ('Eric', 'Hlado', 10, 15),
       ('Alyssa', 'Debussy', 11, 15),
       ('Jim', 'Lacek', 12, 11),
       ('Amber', 'Kesterly', 13, 15),
       ('Colicia', 'Henson', 14, 13),
       ('Lamanda', 'Gunit', 15, null);