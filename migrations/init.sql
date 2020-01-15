-- drop route table
DROP TABLE IF EXISTS routes cascade;

-- create route table
CREATE TABLE IF NOT EXISTS routes (
    route_name VARCHAR(3) PRIMARY KEY,
    start_point VARCHAR(60) NOT NULL,
    end_point VARCHAR(60) NOT NULL,
    map VARCHAR
);

-- seed route table
INSERT INTO
    routes (route_name, start_point, end_point, map)
VALUES
    ('608', 'ΝΕΚΡΟΤΑΦΕΙΟ ΖΩΓΡΑΦΟΥ', 'ΓΑΛΑΤΣΙ','https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d50307.85419397123!2d23.7200587067922!3d37.99484140815476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a197ee1d2361b3%3A0x5f8102efa34d2335!2zzp3Otc66z4HOv8-EzrHPhs61zq_OvywgWm9ncmFmb3U!3m2!1d37.972401399999995!2d23.7803185!4m5!1s0x14a1a2849e23b62d%3A0xa377ba069b113618!2zzpPOsc67zqzPhM-Dzrk!3m2!1d38.0188948!2d23.756022299999998!5e0!3m2!1sen!2sgr!4v1579112035264!5m2!1sen!2sgr'),
    ('X95', 'ΣΥΝΤΑΓΜΑ', 'ΚΤΙΡΙΟ ΑΝΑΧΩΡΗΣΕΩΝ','https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d100653.46818880957!2d23.771626119200487!3d37.967306036925436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a1bd3e5f1b9f2d%3A0xfef6c34b5629278d!2zzqPOpc6dzqTOkc6TzpzOkSwgQXRoZW5z!3m2!1d37.9745068!2d23.7352651!4m5!1s0x14a1901ad9e75c61%3A0x38b215df0aeeb3aa!2zzpTOuc61zrjOvc6uz4IgzpHOtc-Bzr_Ou865zrzOrc69zrHPgiDOkc64zrfOvc-Ozr0gKEFUSCksIEF0dGlraSBPZG9zLCBTcGF0YS1BcnRlbWlkYQ!3m2!1d37.9356467!2d23.9484156!5e0!3m2!1sen!2sgr!4v1579115778576!5m2!1sen!2sgr'),
    ('224', 'Καισαριανης', 'Eleftheriou Venizelou','https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d25158.213708708554!2d23.736932!3d37.9823399!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a197e8695b4a57%3A0xf18691975c281e08!2sSTARTING%20POINT%20KESARIANI!3m2!1d37.9649664!2d23.776362799999998!4m5!1s0x14a1a2a5fe7fed8d%3A0xe25904bb4f881855!2zzpXOmy7Oks6Vzp3Omc6WzpXOm86fzqUsIEF0aGluYSAxMTQgNzY!3m2!1d37.9977892!2d23.757151699999998!5e0!3m2!1sen!2sgr!4v1579120722249!5m2!1sen!2sgr');
-- drop stops table
DROP TABLE IF EXISTS stops cascade;

-- create stops table
CREATE TABLE IF NOT EXISTS stops (
    id UUID NOT NULL,
    stop_name VARCHAR(40) NOT NULL,
);

INSERT INTO
    stops (stop_name)
VALUES
    ('ΝΕΚΡΟΤΑΦΕΙΟ ΖΩΓΡΑΦΟΥ'),
    ('ΕΥΑΓΓΕΛΙΣΜΟΣ'),
    ('ΣΥΝΤΑΓΜΑ')
    ('ΠΟΛΥΓΩΝΟ');

-- drop user table
DROP TABLE IF EXISTS users cascade;

-- create user table
CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(40),
    telephone VARCHAR(10),
    afm VARCHAR(9),
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY(id),
    created_date TIMESTAMP
) WITH (oids = false);

-- seed user table
-- INSERT INTO
--     users (
--         first_name,
--         last_name,
--         telephone,
--         afm,
--         email,
--         password
--     )
-- VALUES
--     (
--         'Kyriakos',
--         '',
--         'Charalambous',
--         '6941234567',
--         '777777777',
--         'kyriakos@charalambous.com',
--         'password'
--     ),
--     (
--         'Constantinos',
--         '',
--         'Georgiou',
--         '6947777777',
--         '555555555',
--         'lordconstantinos@gmail.com',
--         'abcd1234'
--     );