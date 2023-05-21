DROP DATABASE IF EXISTS products_dev;

CREATE DATABASE products_dev;

\c products_dev;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    category TEXT,
    manufacturer TEXT,
    cost NUMERIC,
    rating NUMERIC
    CHECK (rating >= 0 AND rating <= 5),
    inStock BOOLEAN
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    title TEXT,
    reviewer TEXT,
    content TEXT,
    products_id INTEGER REFERENCES products(id)
    ON DELETE CASCADE
);