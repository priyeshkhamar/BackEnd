const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskmanagement').then(() => console.log("Connected to the Database!"));

const schema = mongoose.Schema;

const TaskManagementSchema = new schema({
    taskName: {
        type: String
    },
    description: {
        type: String
    },
    assignedTo: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed', 'on hold'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TaskManagementModel = mongoose.model('TaskManagement', TaskManagementSchema);

module.exports = TaskManagementModel;