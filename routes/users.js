const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json({ error: err }));
});

router.route("/").post((req, res) => {
	const fields = req.body;
	const newUser = new User({ ...fields });
	newUser
		.save()
		.then(() => res.json({ message: "User saved correctly." }))
		.catch((err) => res.status(400).json({ error: err }));
});

router.route("/:id").get((req, res) => {
	User.findOne({ id: req.params.id })
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json({ error: err }));
});

router.route("/:id").put((req, res) => {
	const id = req.params.id;
	const fields = req.body;
	User.findOne({ id: id })
		.then((user) => {
			user.id = id;
			user.name = fields.name;
			user.last_name = fields.last_name;
			user.age = fields.age;
			user.email = fields.email;
			user.active = fields.active;
			user.save()
				.then(() => res.json({ message: "User updated correctly." }))
				.catch((err) => res.status(400).json({ error: err }));
		})
		.catch((err) => res.status(404).json({ error: err }));
});

router.route("/:id").delete((req, res) => {
	User.findOneAndDelete({ id: req.params.id })
		.then(() => res.json({ message: "User deleted correctly." }))
		.catch((err) => res.status(404).json({ error: err }));
});

module.exports = router;
