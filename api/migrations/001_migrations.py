steps = [
    [
        """
        CREATE TABLE properties (
            property_name VARCHAR(250) NOT NULL,
            street VARCHAR(250) NOT NULL,
            city VARCHAR(250) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            state VARCHAR(2) NOT NULL,
            total_members INTEGER ,
            food_fee MONEY NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            property_picture_url VARCHAR(350),
            property_id SERIAL PRIMARY KEY NOT NULL
        );
        """,
        """
        DROP TABLE properties;
        """
    ],
    [
        """
        CREATE TABLE users (
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR (100) NOT NULL,
            terms_boolean BOOLEAN NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            property INTEGER REFERENCES properties(property_id),
            user_id SERIAL PRIMARY KEY NOT NULL
        );
        """,

        """
        DROP TABLE users;
        """
    ],
    [
        """
        CREATE TABLE brands (
        name VARCHAR(250) UNIQUE NOT NULL,
        brand_id SERIAL PRIMARY KEY NOT NULL,
        logo_url VARCHAR(350)
        );
        """,
        """
        DROP TABLE brands;
        """
    ],
    [
        """
        CREATE TABLE vendors (
        name VARCHAR(250) UNIQUE NOT NULL,
        vendor_id SERIAL PRIMARY KEY NOT NULL,
        logo_url VARCHAR(350)
        );
        """,
        """
        DROP TABLE vendors;
        """
    ]
]
