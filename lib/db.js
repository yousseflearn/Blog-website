import mongoose from 'mongoose';
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on('Connected', () => {
      console.log('MongoDB connected successfully!');
    });
    connection.on('error', (err) => {
      console.log('MongoDB connection error,please make sure everything is ok');
      process.exit();
    });
  } catch (error) {
    console.log('something goes wrong');
    console.log(error);
  }
}
