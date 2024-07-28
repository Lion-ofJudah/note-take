import { verifiedUser } from "../middlewares/verifiedUser.middleware.js";
import Note from "../models/note.model.js";
import Bin from "../models/bin.model.js";

export const createNote = [
  verifiedUser,

  async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title && !body) {
        return res.status(400).json({
          success: false,
          message: "Empty note not supported.",
        });
      }

      const creator = req.user.id;

      const note = await Note.create({
        title,
        body,
        creator,
      });

      return res.status(200).json({
        success: true,
        message: "Note created successfully.",
        data: note,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
];

export const deleteNote = [
  verifiedUser,

  async (req, res) => {
    try {
      const { id } = req.params;
      const creator = req.user.id;

      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found.",
        });
      }

      if (creator !== note.creator.toString()) {
        return res.status(404).json({
          success: false,
          message: "Unauthorized action.",
        });
      }

      const bin = await Bin.create({
        title: note.title,
        body: note.body,
        creator: note.creator,
      });

      await Note.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message:
          "Note successfully put in bin. It will be automatically deleted in 30 days.",
        data: bin,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
];
