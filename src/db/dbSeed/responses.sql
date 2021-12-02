CREATE TABLE IF NOT EXISTS responses (
  id SERIAL PRIMARY KEY,
  entries_id int NOT NULL,
  FOREIGN KEY (entries_id) REFERENCES entries (id),
  questions_id int NOT NULL,
  FOREIGN KEY (questions_id) REFERENCES questions (id),
  text VARCHAR
);

INSERT INTO responses
(entries_id, questions_id, text)
VALUES
(
(SELECT id from entries WHERE id = 1),
(SELECT id from questions WHERE id = 4),
'EXAMPLE'
)