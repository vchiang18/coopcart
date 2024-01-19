steps = [
    [
        """
        CREATE TABLE requests (
            request_id SERIAL PRIMARY KEY NOT NULL,
            item VARCHAR(250),
            brand VARCHAR(250) NOT NULL,
            unit_quantity INTEGER NOT NULL,
            unit_type VARCHAR(50) NOT NULL,
            requestor INTEGER REFERENCES users(user_id),
            created_date TIMESTAMP NOT NULL,
            status VARCHAR(100) DEFAULT “New”,
            quantity INTEGER NOT NULL,
            status VARCHAR(100) DEFAULT “New”,
            quantity INTEGER NOT NULL,
            last_edited_by INTEGER REFERENCES users(user_id),
            last_edited TIMESTAMP
        )
        """,
        """
        DROP TABLE order;
        """
    ],
    [
        """
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY NOT NULL,
            item INTEGER REFERENCES food_items(food_item_id) NOT NULL,
            brand INTEGER REFERENCES brands(brand_id) NOT NULL,
            unit_quantity INTEGER NOT NULL,
            unit_type VARCHAR(50) NOT NULL,
            vendor INTEGER REFERENCES vendors(vendor_id) NOT NULL,
            requestor INTEGER REFERENCES users(user_id) NOT NULL,
            created_date TIMESTAMP NOT NULL,
            quantity INTEGER NOT NULL,
            purchased_price MONEY NOT NULL,
            purchased_quantity INTEGER NOT NULL,
            notes TEXT,
            last_edited_by INTEGER REFERENCES users(user_id),
            last_edited TIMESTAMP
        );
        """,

        """
        DROP TABLE orders;
        """
    ],
]
