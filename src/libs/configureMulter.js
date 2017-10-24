import Multer from "multer";
import getVariable from "../config/getVariable";

export default () => Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: parseInt(getVariable("MAX_ALLOWED_FILE_SIZE"), 10),
  },
});
