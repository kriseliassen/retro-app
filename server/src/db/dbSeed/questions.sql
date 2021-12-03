CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  templates_id int,
  FOREIGN KEY (templates_id) REFERENCES templates (id)
);

INSERT INTO questions 
(question, type, templates_id)
VALUES
('Engine: What has been pushing us forward or making us move faster?', 'text', (SELECT id FROM templates WHERE name = 'Speed Car')),
('Parachute: What has been slowing us down?', 'text', (SELECT id FROM templates WHERE name = 'Speed Car')),
('I would like to acknowledge [coworker] for [something they did well]', 'text', (SELECT id FROM templates WHERE name = 'Token of appreciation')),
('What went well?', 'text', (SELECT id FROM templates WHERE name = 'Classic')),
('What did not go so well?', 'text', (SELECT id FROM templates WHERE name = 'Classic')),
('How hard was today?', 'number', (SELECT id FROM templates WHERE name = 'Classic')),
('How fun was today?', 'number', (SELECT id FROM templates WHERE name = 'Classic')),
('How productive was today?', 'number', (SELECT id FROM templates WHERE name = 'Classic')),
('Keep – something the team is doing well and whose value you recognize the value', 'text', (SELECT id FROM templates WHERE name = 'Kalm')),
('Add – a new idea or something you have seen working before that you would like to bring to the table.', 'text', (SELECT id FROM templates WHERE name = 'Kalm')),
('Less – something already being done, but of which you rather do less.', 'text', (SELECT id FROM templates WHERE name = 'Kalm')),
('More – something already being done which believe will bring more value if done even more.', 'text', (SELECT id FROM templates WHERE name = 'Kalm'))
