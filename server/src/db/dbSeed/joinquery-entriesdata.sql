-- this query outputs a table with all data for each entry
SELECT entries_id, date, user_id, users.team_id, entries.templates_id, name AS template_name, questions_id, question, text AS response, type
from entries
JOIN templates
ON templates.id = entries.templates_id
LEFT JOIN questions
ON questions.templates_id = templates.id
LEFT JOIN responses
ON responses.questions_id = questions.id
LEFT JOIN users
ON users.id = entries.user_id

