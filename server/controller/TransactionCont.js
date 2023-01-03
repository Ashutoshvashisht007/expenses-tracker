import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
    // find({}) will fetch everything
    const transaction = await Transaction.find({user_id: req.user._id}).sort({ createdAt: -1 });

    res.json({ data: transaction });
    // res.json({ data: demo });
}

export const create = async (req, res) => {
    const { amount, description, date,  } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        user_id: req.user._id,
        date,
    });
    await transaction.save();
    res.json({ message: 'Success' });
}

export const deletee = async (req, res) => {
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "success" });
}

export const update = async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Success" });
}