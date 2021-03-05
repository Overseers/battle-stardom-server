import { Client } from 'pg';

export const database = new Client();

database.connect((error) => {
    console.error('Failed to connect to database:', error);
});
