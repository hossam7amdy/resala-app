SELECT
    o.total_paid,
    o.total_orders,
    u.*
FROM "user" AS u
JOIN (
    SELECT 
        user_id,
        SUM(total) AS total_paid,
        COUNT(*) AS total_orders
    FROM "order"
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 10
    ) AS o
    ON (o.user_id = u.id)
ORDER BY 1 DESC;