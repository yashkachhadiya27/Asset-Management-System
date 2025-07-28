// import express from "express";
// import LabController from "../controller/labController";

// export const labRouter = express.Router();

// labRouter.post('/create-lab-layout', LabController.createLabLayout);


// import express from 'express';
// import LabController from '../controller/labController.js'; // Ensure the path is correct

// export const labRouter = express.Router();

// labRouter.post('/create-lab-layout', LabController.createLabLayout);
import express from 'express';
import LabController from '../controller/labController.js'; // Ensure the path is correct

export const labRouter = express.Router();

// Route to create a new lab layout
labRouter.post('/create-lab-layout', LabController.createLabLayout);

// Route to add a new lab
labRouter.post('/add-lab', LabController.addLab);

// Route to get all labs
labRouter.get('/all', LabController.getLabs);

// Route to get a specific lab by name
labRouter.get('/:labName', LabController.getLab);

// Route to update a lab by name
labRouter.put('/:labName', LabController.updateLab);

// Route to update a lab's layout by name
labRouter.put('/:labName/layout', LabController.updateLabLayout);

// Route to delete a lab by name
labRouter.delete('/:labName', LabController.deleteLab);

// Route to get a specific lab layout by name
labRouter.get('/:labName/layout', LabController.getLabLayout);

labRouter.post('/assign/labassignment',LabController.assignLab)

