-- Optional: create database. Skip if AKFERP already exists.
IF DB_ID(N'AKFERP') IS NULL
BEGIN
    CREATE DATABASE [AKFERP];
END
GO

USE [AKFERP];
GO
