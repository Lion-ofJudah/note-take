import { verifiedUser } from "../middlewares/verifiedUser.middleware.js";
import Note from "../models/note.model.js";

export const createNote = [
  verifiedUser,

  async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Provide a title for your note.",
        });
      }

      if (!body) {
        return res.status(400).json({
          success: false,
          message: "Provide a body for your note.",
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
