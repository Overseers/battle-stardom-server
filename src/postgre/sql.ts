import fs from 'fs';
import path from 'path';

export const getPlayer = fs.readFileSync(path.resolve('./src/postgre/sql/getPlayer.sql'), 'utf8');
