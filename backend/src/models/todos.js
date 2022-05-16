const mongoose = require('mongoose')


const todoschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        required: true,
      },
    });
    
    module.exports = mongoose.model('Todo', todoschema);
