CREATE TABLE IF NOT EXISTS routes (
    route_name varchar(4) PRIMARY KEY,
    start_point varchar(60) NOT NULL,
    end_point varchar(60) NOT NULL,
    map varchar(100)
);

INSERT INTO
    routes (route_name, start_point, end_point)
VALUES
    ('608', 'ΝΕΚΡΟΤΑΦΕΙΟ ΖΩΓΡΑΦΟΥ', 'ΓΑΛΑΤΣΙ');

INSERT INTO
    routes (route_name, start_point, end_point)
VALUES
    ('X95', 'ΣΥΝΤΑΓΜΑ', 'ΚΤΙΡΙΟ ΑΝΑΧΩΡΗΣΕΩΝ');

INSERT INTO
    routes (route_name, start_point, end_point)
VALUES
    ('140', 'ΠΟΛΥΓΩΝΟ', 'ΓΛΥΦΑΔΑ');