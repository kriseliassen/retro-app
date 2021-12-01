CREATE TABLE IF NOT EXISTS teamstemplates (
  id SERIAL PRIMARY KEY,
  team_id int,
  FOREIGN KEY (team_id) REFERENCES teams (id),
  templates_id int,
  FOREIGN KEY (templates_id) REFERENCES templates (id)
);

INSERT INTO teamstemplates ( team_id, templates_id)
VALUES 
  ((SELECT id FROM teams WHERE name = 'Mobsters'), (SELECT id FROM templates WHERE name = 'Classic')),
  ((SELECT id FROM teams WHERE name = 'Fjordie'), (SELECT id FROM templates WHERE name = 'Classic')),
((SELECT id FROM teams WHERE name = 'Rubix'), (SELECT id FROM templates WHERE name = 'Kalm'))