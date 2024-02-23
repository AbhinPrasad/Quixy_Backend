import mongoose from "mongoose";
import chalk from 'chalk';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.yellowBright("Database connected"));
    } catch (err) {
        console.log(chalk.redBright("Database connection failed",err));
    }
}

export default connectDB;