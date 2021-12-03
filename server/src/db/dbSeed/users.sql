CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  team_id int,
  FOREIGN KEY (team_id) REFERENCES teams (id)
);

INSERT INTO users (first_name, last_name, email, password, team_id)
VALUES (
  'John', 
  'Snow', 
  'john@snow.com', 
  'thisisaplaintextpassword', 
  (SELECT id FROM teams WHERE name = 'Mobsters')
)