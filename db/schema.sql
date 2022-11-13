-- Deletes the stagename database if it is already in existence
DROP DATABASE IF EXISTS stagename_db;

-- Creates a new stagename database
CREATE DATABASE stagename_db;

-- Selects the stagenem database to use for the application
USE stagename_db;