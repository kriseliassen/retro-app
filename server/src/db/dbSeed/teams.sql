CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY
  UNIQUE(name) VARCHAR NOT NULL
)

INSERT INTO teams 
(name)
VALUES
('Fjordie'),
('Mobsters'),
('Rubix'),
('Status202')

ALTER TABLE teams ADD UNIQUE (name)