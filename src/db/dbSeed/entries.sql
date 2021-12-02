CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  templates_id int,
  FOREIGN KEY (templates_id) REFERENCES templates (id),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users (id),
  date VARCHAR
);

INSERT INTO entries
(templates_id, user_id, date)
VALUES
(
(SELECT id from templates WHERE id = 1),
(SELECT id from users WHERE id = 4),
2021-12-12
)