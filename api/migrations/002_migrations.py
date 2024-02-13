steps = [
    [
        """
        CREATE TABLE food_items (
            item_name VARCHAR(250) NOT NULL,
            brand INTEGER REFERENCES brands(brand_id) NOT NULL,
            vendor INTEGER REFERENCES vendors(vendor_id) NOT NULL,
            unit_type VARCHAR(100) NOT NULL,
            unit_quantity INTEGER NOT NULL,
            price MONEY NOT NULL,
            food_item_id SERIAL PRIMARY KEY NOT NULL
        );
        """,
        """
        DROP TABLE food_items;
        """
    ],
    [
        """
        CREATE TABLE budgets (
            property INTEGER REFERENCES properties(property_id) NOT NULL,
            food_fee INTEGER,
            total_members INTEGER,
            monthly_budget MONEY,
            monthly_spend MONEY,
            monthly_remaining MONEY,
            ytd_budget MONEY,
            ytd_spend MONEY,
            ytd_remaining_budget MONEY,
            budget_id SERIAL PRIMARY KEY NOT NULL
        );
        """,
        """
        DROP TABLE budgets;
        """
    ],
    [
        """
        CREATE TABLE managers (
            property_id INTEGER REFERENCES properties(property_id) NOT NULL,
            user_id INTEGER REFERENCES users(user_id) NOT NULL,
            manager_join_id SERIAL PRIMARY KEY NOT NULL
        );
        """,
        """
        DROP TABLE managers;
        """
    ]
]
