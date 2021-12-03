-- this query outputs a table with all data for each entry
SELECT entries_id, date, user_id, entries.templates_id, name, description, questions_id, question, text, type
from entries
JOIN templates
ON templates.id = entries.templates_id
LEFT JOIN questions
ON questions.templates_id = templates.id
LEFT JOIN responses
ON responses.questions_id = questions.id