steps = [
    [
        """
        CREATE TABLE requests (
            request_id SERIAL PRIMARY KEY NOT NULL,
            item VARCHAR(250),
            brand INTEGER REFERENCES brands(brand_id),
            unit_quantity INTEGER,
            unit_type VARCHAR(50),
            requestor INTEGER REFERENCES users(user_id),
            created_date TIMESTAMP NOT NULL,
            status VARCHAR(100),
            quantity INTEGER,
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
            item VARCHAR(250),
            brand INTEGER REFERENCES brands(brand_id),
            unit_quantity INTEGER,
            unit_type VARCHAR(50),
            vendor INTEGER REFERENCES vendors(vendor_id),
            requestor INTEGER REFERENCES users(user_id),
            created_date TIMESTAMP NOT NULL,
            status VARCHAR(100),
            quantity INTEGER,
            purchased_price MONEY,
            purchased_quantity INTEGER,
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
