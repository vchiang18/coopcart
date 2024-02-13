steps = [
    [
        """
        CREATE TABLE requests (
            item VARCHAR(250),
            brand VARCHAR(250),
            unit_quantity INTEGER,
            unit_type VARCHAR(50),
            requestor INTEGER REFERENCES users(user_id),
            created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(100) DEFAULT 'New',
            quantity INTEGER NOT NULL,
            last_edited_by INTEGER REFERENCES users(user_id),
            last_edited TIMESTAMP,
            request_id SERIAL PRIMARY KEY NOT NULL

        );
        """,
        """
        DROP TABLE requests;
        """
    ],
    [
        """
        CREATE TABLE orders (
            item_id INTEGER REFERENCES food_items(food_item_id),
            item VARCHAR(250) NOT NULL,
            brand_id INTEGER REFERENCES brands(brand_id),
            brand VARCHAR(250),
            unit_quantity INTEGER,
            unit_type VARCHAR(50),
            vendor_id INTEGER REFERENCES vendors(vendor_id),
            vendor VARCHAR(250),
            requestor INTEGER REFERENCES users(user_id) NOT NULL,
            created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            quantity INTEGER,
            purchased_price MONEY,
            purchased_quantity INTEGER,
            notes TEXT,
            last_edited_by INTEGER REFERENCES users(user_id),
            last_edited TIMESTAMP,
            order_id SERIAL PRIMARY KEY NOT NULL

        );
        """,

        """
        DROP TABLE orders;
        """
    ],
]
