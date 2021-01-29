const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully.");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to User Management REST API, try using the following endpoints:",
		endpoints: [
			{ route: "/users", method: "GET", description: "Get a list of all users." },
			{ route: "/users", method: "POST", description: "Create new user (must include id)." },
			{ route: "/users/{id}", method: "GET", description: "Get user where id = {id}." },
			{ route: "/users/{id}", method: "PUT", description: "Update user where id = {id}." },
			{ route: "/users/{id}", method: "DELETE", description: "Delete user where id = {id}." }
		]
	});
});
