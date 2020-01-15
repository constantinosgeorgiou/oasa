-- drop route table
DROP TABLE IF EXISTS routes cascade;

-- create route table
CREATE TABLE IF NOT EXISTS routes (
    route_name VARCHAR(3) PRIMARY KEY,
    start_point VARCHAR(60) NOT NULL,
    end_point VARCHAR(60) NOT NULL,
    map VARCHAR(100)
);

-- seed route table
INSERT INTO
    routes (route_name, start_point, end_point)
VALUES
    ('608', 'ΝΕΚΡΟΤΑΦΕΙΟ ΖΩΓΡΑΦΟΥ', 'ΓΑΛΑΤΣΙ'),
    ('X95', 'ΣΥΝΤΑΓΜΑ', 'ΚΤΙΡΙΟ ΑΝΑΧΩΡΗΣΕΩΝ'),
    ('140', 'ΠΟΛΥΓΩΝΟ', 'ΓΛΥΦΑΔΑ');

-- drop user table
DROP TABLE IF EXISTS users cascade;

-- create user table
CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL,
    first_name VARCHAR(30),
    middle_name VARCHAR(30),
    last_name VARCHAR(40),
    telephone VARCHAR(10),
    afm VARCHAR(9),
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY(id),
    created_date TIMESTAMP
) WITH (oids = false);

-- seed user table
INSERT INTO
    users (
        first_name,
        last_name,
        telephone,
        afm,
        email,
        password
    )
VALUES
    (
        'Kyriakos',
        '',
        'Charalambous',
        '6941234567',
        '777777777',
        'kyriakos@charalambous.com',
        'password'
    ),
    (
        'Constantinos',
        '',
        'Georgiou',
        '6947777777',
        '555555555',
        'lordconstantinos@gmail.com',
        'abcd1234'
    );