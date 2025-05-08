const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(`Error in getTodos: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving todos' });
  }
};

exports.createTodo = async (req, res) => {
  console.log(req.body);  
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(`Error in createTodo: ${error.message}`);
    res.status(400).json({ message: 'Error creating todo' });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(`Error in updateTodo: ${error.message}`);
    res.status(400).json({ message: 'Error updating todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(`Error in deleteTodo: ${error.message}`);
    res.status(400).json({ message: 'Error deleting todo' });
  }
};
