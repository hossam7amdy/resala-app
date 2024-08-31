SELECT
    t.units_sold,
    p.*
FROM "product" p
JOIN (
    SELECT 
        product_id,
        SUM(quantity) AS units_sold
    FROM "order_item"
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 10
    ) AS t
    ON (t.product_id = p.id)
ORDER BY 1 DESC;
