import {BIGINT, STRING} from "sequelize";

export default (db) => {
  const {models: {User, Textbook}} = db;

  const Bookmark = db.define("Bookmark", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
    textbookId: {
      type: STRING,
      required: true,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["userId", "textbookId"],
    }],
  });

  Bookmark.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  Textbook.hasMany(Bookmark, {
    as: "Bookmarks",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return Bookmark;
};
