const validateCommandInput = (text) => {
  if (!text) {
    return new Error("This command requires a term to search!");
  }
};

module.exports = validateCommandInput;
