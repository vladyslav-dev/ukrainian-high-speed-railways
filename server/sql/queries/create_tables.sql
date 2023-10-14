CREATE TYPE TRAIN_TYPE AS ENUM ('Passenger', 'Cargo');
CREATE TYPE WAGON_TYPE AS ENUM ('Standart', 'VIP');

CREATE TABLE destinations (
	id SERIAL PRIMARY KEY,
	origin_city VARCHAR(255) NOT NULL,
	origin_latitude DECIMAL(9, 6),
	origin_longitude DECIMAL(9, 6),
	destination_city VARCHAR(255) NOT NULL,
	destination_latitude DECIMAL(9, 6),
	destination_longitude DECIMAL(9, 6),
	current_latitude DECIMAL(9, 6),
	current_longitude DECIMAL(9, 6)
);

CREATE TABLE routes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	destination_id INT,
	FOREIGN KEY (destination_id) REFERENCES destinations(id),
	departure_date DATE,
	arrival_date DATE
);

CREATE TABLE trains (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	type TRAIN_TYPE NOT NULL,
	route_id INT,
	FOREIGN KEY (route_id) REFERENCES routes(id)
);

CREATE TABLE wagons (
	id SERIAL PRIMARY KEY,
	number INT NOT NULL,
	type WAGON_TYPE NOT NULL,
	train_id INT,
	FOREIGN KEY (train_id) REFERENCES trains(id)
);

CREATE TABLE seats (
	id SERIAL PRIMARY KEY,
	wagon_id INT,
	FOREIGN KEY (wagon_id) REFERENCES wagons(id),
	number INT NOT NULL,
	reserved BOOLEAN DEFAULT FALSE
);

CREATE TABLE tickets (
	id SERIAL PRIMARY KEY,
	price INT NOT NULL,
	purchase_date TIMESTAMPTZ DEFAULT NOW(),
	is_cancelled BOOLEAN DEFAULT FALSE,
	cancellation_date TIMESTAMPTZ,
	seat_id INT,
	FOREIGN KEY (seat_id) REFERENCES seats(id)
);

CREATE TABLE cargos (
	id SERIAL PRIMARY KEY,
	wagon_id INT,
	FOREIGN KEY (wagon_id) REFERENCES wagons(id),
	name VARCHAR(255) NOT NULL,
	weight INT NOT NULL
);

CREATE TABLE passengers (
	id SERIAL PRIMARY KEY,
	ticket_id INT,
	FOREIGN KEY (ticket_id) REFERENCES tickets(id),
	first_name VARCHAR(255) NOT NULL,
	middle_name VARCHAR(255),
	last_name VARCHAR(255) NOT NULL,
	email VARCHAR(320) NOT NULL UNIQUE,
	phone VARCHAR(255) NOT NULL
);