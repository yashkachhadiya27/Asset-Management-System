import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    labName: { type: String, required: true, unique: true },
    numSystems: { type: Number, required: true, min: 1 },
    path: { type: String, unique: true },
    pcCoordinates: [
      {
        top: { type: Number, required: true ,default: 0},
        left: { type: Number, required: true ,default: 0},
      }
    ],
    labAssistant: {

      cemail: { type: String, ref: "user" }, // Co-Ordinator Id
      aemail: { type: String, ref: "user" }, // Assistant Id
      remarks: { type: String }
    },
  },
  { timestamps: true }
);

labSchema.pre('save', function (next) {
  this.path = `/labs/${this.labName}`; // Set the path value
  next(); // Proceed to save the document
});

export const labModel = mongoose.model("Lab", labSchema);
