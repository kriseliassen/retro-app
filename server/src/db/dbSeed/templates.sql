CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  description VARCHAR
);

INSERT INTO templates 
(name, description)
VALUES
('Speed Car', 'Speed Car is a simple activity for helping the team identify things that make them move faster, and things that slow them down.'),
('Token of appreciation', 'This is a great activity for acknowledgement, increasing the team morale and putting the team on a good mood. '),
('Kalm', 'KALM is a retrospective activity that fosters the conversation about current activities and their perceived value. It helps team members understand each other’s perceived value off such practices.'),
('Classic', '')