DROP DATABASE `tube_drawing`;
CREATE SCHEMA `tube_drawing` ;
use `tube_drawing` ;
CREATE TABLE t_drawing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    production_number_id INT NULL,
    production_date DATE,
    production_time_start TIME,
    production_time_end TIME,
    drawing_type_id INT,
    staff_id INT,
    ordersheet_id INT,
    die_number_id INT,
    die_status_note VARCHAR(255),
    plug_number_id INT,
    plug_status_note VARCHAR(255),
    die_status_id INT,
    plug_status_id INT,
    buloong_a1 DECIMAL(10, 2),
    buloong_a2 DECIMAL(10, 2),
    buloong_b1 DECIMAL(10, 2),
    buloong_b2 DECIMAL(10, 2),
    buloong_c1 DECIMAL(10, 2),
    buloong_c2 DECIMAL(10, 2),
    buloong_d1 DECIMAL(10, 2),
    buloong_d2 DECIMAL(10, 2),
    conveyor_height DECIMAL(10, 2),
    conveyor_height_note VARCHAR(255),
    compress_dim DECIMAL(10, 2),
    compress_dim_note VARCHAR(255),
    compress_pressure DECIMAL(10, 2),
    compress_pressure_note VARCHAR(255),
    clamp_pressure DECIMAL(10, 2),
    clamp_pressure_note VARCHAR(255),
    start_pull_speed DECIMAL(10, 2),
    main_pull_speed DECIMAL(10, 2),
    end_pull_speed DECIMAL(10, 2),
    pusher_speed DECIMAL(10, 2),
    cutting_date DATE,
    cutting_staff_id INT,
    file_url VARCHAR(255),
    straight DECIMAL(10, 2),
    angle DECIMAL(10, 2),
    roller_dis DECIMAL(10, 2),
    roller_speed DECIMAL(10, 2),
    puller_force DECIMAL(10, 2)
);
CREATE TABLE t_profile_cut (
    id INT PRIMARY KEY AUTO_INCREMENT,
    drawing_id INT,
    rack_number INT,
    order_number INT,
    ok_quantity INT,
    ng_quantity INT
);
CREATE TABLE t_used_extrusion_rack (
    id INT PRIMARY KEY AUTO_INCREMENT,
    using_aging_rack_id INT,
    quantity INT,
    drawing_id INT,
    ordinal INT
);
CREATE TABLE m_dies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    die_number VARCHAR(50),
    ex_production_numbers_id INT,
    diameter DECIMAL(10, 2),
    note VARCHAR(255)
);
CREATE TABLE m_plugs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plug_number VARCHAR(50),
    ex_production_numbers_id INT,
    diameter DECIMAL(10, 2),
    note VARCHAR(255)
);
CREATE TABLE m_production_numbers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ex_production_numbers_id INT,
    production_number VARCHAR(50),
    production_length DECIMAL(10, 2),
    specific_weight DECIMAL(10, 2),
    packing_column INT,
    packing_row INT,
    hardness INT,
    b_drawing_l DECIMAL(10, 2),
    b_drawing_out_d DECIMAL(10, 2),
    b_drawing_in_d DECIMAL(10, 2),
    b_drawing_t DECIMAL(10, 2),
    a_drawing_l DECIMAL(10, 2),
    a_drawing_out_d DECIMAL(10, 2),
    a_drawing_in_d DECIMAL(10, 2),
    a_drawing_t DECIMAL(10, 2),
    conveyor_height DECIMAL(10, 2),
    compress_dim DECIMAL(10, 2),
    compress_pressure DECIMAL(10, 2),
    clamp_pressure DECIMAL(10, 2),
    start_pull_speed DECIMAL(10, 2),
    main_pull_speed DECIMAL(10, 2),
    end_pull_speed DECIMAL(10, 2),
    pusher_speed DECIMAL(10, 2),
    puller_force DECIMAL(10, 2),
    straight DECIMAL(10, 2),
    angle DECIMAL(10, 2),
    roller_dis DECIMAL(10, 2),
    roller_speed DECIMAL(10, 2),
    curvature DECIMAL(10, 2)
);
CREATE TABLE t_rack_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    using_aging_rack_id INT,
    washing_data_id INT
);
CREATE TABLE t_washing (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_date DATE NULL,
    chemical_concentration DECIMAL(10, 2) NULL,
    soaking_time INT(10) UNSIGNED NULL,
    soaking_temperature DECIMAL(5, 2) NULL,
    drying_temperature DECIMAL(5, 2) NULL
);
CREATE TABLE t_washing_case (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    washing_id INT(10) UNSIGNED NULL,
    staff_id INT(10) UNSIGNED NULL,
    start_time DATETIME NULL,
    end_time DATETIME NULL
);
CREATE TABLE t_washing_data (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    washing_case_id INT(10) UNSIGNED NULL,
    drawing_id INT(10) UNSIGNED NULL,
    start_tube INT(10) UNSIGNED NULL,
    end_tube INT(10) UNSIGNED NULL,
    quantity INT(10) UNSIGNED NULL,
    order_number INT(10) UNSIGNED NULL
);

CREATE TABLE m_ordersheet (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    production_quantity INT(10) UNSIGNED NULL,
    production_numbers_id INT(10) UNSIGNED NULL,
    ordersheet_number VARCHAR(50) NULL,
    note VARCHAR(200) NULL,
    issue_date_at DATETIME NULL,
    delivery_date_at DATETIME NULL,
    updated_at DATE 
);

CREATE TABLE t_directive (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    die_number_id INT(10) UNSIGNED NULL,
    drawing_type_id INT(10) UNSIGNED NULL,
    plug_number_id INT(10) UNSIGNED NULL,
    product_date DATE NULL,
    production_number_id INT(10) UNSIGNED NULL,
    staff_id INT(10) UNSIGNED NULL
);
CREATE TABLE m_staff (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NULL,
    staff_id VARCHAR(50) NULL,
    code VARCHAR(50) NULL
);

CREATE TABLE m_die_plug_status (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NULL
);

CREATE TABLE m_drawing_type (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    m_drawing_type VARCHAR(100) NULL
);

