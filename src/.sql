CREATE DATABASE interceptor




CREATE TABLE users (
    id TEXT NOT NULL primary key,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL 
);  

