export default ({User, School}) => {
  User.belongsTo(School, {foreignKey: "schoolId", targetKey: "id"});
};
