const { customAlphabet } = require("nanoid");

const Expense = require("../models/expense.model");
const { fetchAllExpenses } = require("../utils/income-expense.utils");

const getAllExpenses = async (req, res, next) => {
	try {
		const expenses = await fetchAllExpenses();
		res.send({ message: "inside all expenses", expenses });
	} catch (e) {
		// TODO: make an error handler middleware
		console.log(e);
	}
};

const getSingleExpense = async (req, res, next) => {
	const id = req.params.id;
	try {
		const expense = await Expense.findOne({ expenseId: id }).lean().exec();
		res.send({ message: "inside single expenses", expense });
	} catch (e) {
		console.log(e);
	}
};

const postExpense = async (req, res, next) => {
	const nanoid = customAlphabet(
		"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQESTUVWXYZ"
	);

	const { title, amount } = req.body.expense;
	const expenseId = nanoid();
	const dateCreated = "Today";

	try {
		const expense = await Expense.create({
			title,
			amount,
			dateCreated,
			expenseId,
		});
		res.status(201).send({
			message: "inside post expenses ",
			posted: expense.toObject(),
		});
	} catch (e) {
		console.log(e);
	}
};

const updateExpense = (req, res, next) => {
	res.send({
		message: "inside update expenses ",
		updated: req.body.updateExpense,
	});
};

const deleteAllExpenses = (req, res, next) => {
	res.send({ message: "inside delete all expenses " });
};

const deleteSingleExpense = (req, res, next) => {
	res.send({ message: "inside delete single expenses " });
};

module.exports = {
	getAllExpenses,
	getSingleExpense,
	postExpense,
	updateExpense,
	deleteAllExpenses,
	deleteSingleExpense,
};

// TODO: install nanoid
// TODO: use nanoid to generate unique ids
// TODO: use moment to generate date in post expense
// TODO: validate the title and amount
