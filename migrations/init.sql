-- drop route table
DROP TABLE IF EXISTS routes cascade;

-- create route table
CREATE TABLE IF NOT EXISTS routes (
    route_name VARCHAR(3) PRIMARY KEY,
    start_point VARCHAR(60) NOT NULL,
    end_point VARCHAR(60) NOT NULL,
    map VARCHAR(200)
);

-- seed route table
INSERT INTO
    routes (route_name, start_point, end_point, map)
VALUES
    ('608', 'ΝΕΚΡΟΤΑΦΕΙΟ ΖΩΓΡΑΦΟΥ', 'ΓΑΛΑΤΣΙ','https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d50307.85419397123!2d23.7200587067922!3d37.99484140815476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a197ee1d2361b3%3A0x5f8102efa34d2335!2zzp3Otc66z4HOv8-EzrHPhs61zq_OvywgWm9ncmFmb3U!3m2!1d37.972401399999995!2d23.7803185!4m5!1s0x14a1a2849e23b62d%3A0xa377ba069b113618!2zzpPOsc67zqzPhM-Dzrk!3m2!1d38.0188948!2d23.756022299999998!5e0!3m2!1sen!2sgr!4v1579112035264!5m2!1sen!2sgr'),
    ('X95', 'ΣΥΝΤΑΓΜΑ', 'ΚΤΙΡΙΟ ΑΝΑΧΩΡΗΣΕΩΝ','https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d100653.46818880957!2d23.771626119200487!3d37.967306036925436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a1bd3e5f1b9f2d%3A0xfef6c34b5629278d!2zzqPOpc6dzqTOkc6TzpzOkSwgQXRoZW5z!3m2!1d37.9745068!2d23.7352651!4m5!1s0x14a1901ad9e75c61%3A0x38b215df0aeeb3aa!2zzpTOuc61zrjOvc6uz4IgzpHOtc-Bzr_Ou865zrzOrc69zrHPgiDOkc64zrfOvc-Ozr0gKEFUSCksIEF0dGlraSBPZG9zLCBTcGF0YS1BcnRlbWlkYQ!3m2!1d37.9356467!2d23.9484156!5e0!3m2!1sen!2sgr!4v1579115778576!5m2!1sen!2sgr'),
    ('140', 'ΠΟΛΥΓΩΝΟ', 'ΓΛΥΦΑΔΑ','https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d100701.54122684234!2d23.67136416807499!3d37.932225443310365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x14a1bfcebb9bb673%3A0x7b950fd1ae01fe2!2zzqDOm86RzqTOlc6ZzpEgzpPOm86lzqbOkc6UzpHOoywgR2x5ZmFkYQ!3m2!1d37.8637893!2d23.7464847!4m5!1s0x14a1a2b0d5e23fcf%3A0x4d677483cd35cdf0!2zzqDOv867z43Os8-Jzr3OvywgQXRoZW5z!3m2!1d37.9974566!2d23.745798399999998!5e0!3m2!1sen!2sgr!4v1579115914422!5m2!1sen!2sgr');

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