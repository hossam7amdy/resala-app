SELECT 
    SUM(total) AS sales,
    to_char(created_at, 'YYYY-MM') AS date
FROM "order"
GROUP BY date
ORDER BY date ASC
LIMIT 12;