import { MONGO_CLIENT_URL, MONGO_URL } from '$env/static/private';
import mongoose from 'mongoose';

// const devEnv = process.env.NODE_ENV === 'development';

const connectionString: string = MONGO_CLIENT_URL;

// if (devEnv) connectionString = MONGO_URL;
// else connectionString = MONGO_CLIENT_URL;

export async function startMongo() {
	return mongoose.connect(connectionString);
}
