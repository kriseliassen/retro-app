// This query yields all questions from a template_id

SELECT
    *
FROM
    (
    SELECT
        id, question, type
    FROM
        questions
    WHERE
        templates_id  = 4
    ) AS nested