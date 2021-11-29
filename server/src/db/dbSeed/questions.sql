CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY
  question VARCHAR NOT NULL
  type VARCHAR NOT NULL
  templates_id int
  FOREIGN KEY (templates_id) REFERENCES templates (id)
)

INSERT INTO questions 
(question, type, templates_id)
VALUES
('Engine: What has been pushing us forward or making us move faster?', 'text', 1),
('Parachute: What has been slowing us down?', 'text', 1),
('I would like to acknowledge [coworker] for [something they did well]', 'text', 2),
('What went well?', 'text', 4),
('What did not go so well?', 'text', 4),
('How hard was today?', 'number', 4),
('How fun was today?', 'number', 4),
('How productive was today?', 'number', 4),
