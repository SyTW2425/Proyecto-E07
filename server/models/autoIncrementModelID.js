const Counter = require('./counterModel'); // Un modelo adicional para contar

const autoIncrementModelID = function (modelName, doc, next) {
  Counter.findOneAndUpdate(
    { model: modelName },
    { $inc: { count: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.numero = counter.count;
      next();
    }
  );
};

module.exports = autoIncrementModelID;
