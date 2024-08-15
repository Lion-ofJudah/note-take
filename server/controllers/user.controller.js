import { verifiedUser } from "../middlewares/verifiedUser.middleware.js";
import Note from "../models/note.model.js";
import Bin from "../models/bin.model.js";

export const getNotes = [
  verifiedUser,

  async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized user.",
        });
      }

      const notes = await Note.find({ creator: userId });

      return res.status(200).json({
        success: true,
        message: "Get request successful.",
        data: notes,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
];

export const getBinNotes = [
  verifiedUser,

  async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized user.",
        });
      }

      const binNotes = await Bin.find({ creator: userId });

      return res.status(200).json({
        success: true,
        message: "Get request successful.",
        data: binNotes,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
];
