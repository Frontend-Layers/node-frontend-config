const DB = process.env.DB;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB, (err) => {
    if (!err) {
      console.log('[db] MongoDB Connection Succeeded.');
    } else {
      console.error(err);
    }
  });
}

module.exports = mongoose;
