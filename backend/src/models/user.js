import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	biography: String,
	picture: String
})

export default mongoose.model("user", userSchema)