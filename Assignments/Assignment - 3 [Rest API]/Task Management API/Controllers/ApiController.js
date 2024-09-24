const TaskManagementModel = require('../Models/TaskManagementModel');

const tasklist = async (req, res) => {
        let data = await TaskManagementModel.find();
        res.json({
            data: data,
            msg: "Task List Displayed Successfully!"
        });
};

const addtask = async (req, res) => {
    const { taskid, taskName, description, assignedTo, status, priority, dueDate, createdAt, updatedAt } = req.body;

        let data;
        if (taskid) {
            data = await TaskManagementModel.findByIdAndUpdate(taskid, {
                taskName: taskName,
                description: description,
                assignedTo: assignedTo,
                status: status,
                priority: priority,
                dueDate: dueDate,
                updatedAt: Date.now()
            }, { new: true });
        } else {
            data = new TaskManagementModel({
                taskName: taskName,
                description: description,
                assignedTo: assignedTo,
                status: status,
                priority: priority,
                dueDate: dueDate,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
            await data.save();
        }

        res.json({
            msg: taskid ? "Task updated successfully!" : "Task added successfully!",
            data: data
        });
};

const deletetask = async (req, res) => {
    let id = req.params.id;
        let data = await TaskManagementModel.findByIdAndDelete(id);
        if (data) {
            res.json({ msg: "Task deleted successfully!" });
        } else {
            res.status(404).json({ msg: "Task not found!" });
        }
};

const edittask = async (req, res) => {
    let id = req.params.id;
        let data = await TaskManagementModel.findById(id);
        if (data) {
            res.json({ data: data, msg: "Task fetched successfully!" });
        } else {
            res.status(404).json({ msg: "Task not found!" });
        }
};

module.exports = { tasklist, addtask, deletetask, edittask };