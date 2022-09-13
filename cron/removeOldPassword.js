const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {previousPassService} = require('../services');

dayJs.extend(utc);

module.exports = async () => {
  try {
    console.log('Remove old password start', new Date().toISOString());
    const oneMonthBeforeNow = dayJs().utc()
      .subtract(6, 'month');

    await previousPassService.deleteManyBeforeDate(oneMonthBeforeNow);

    console.log('Remove old password end', new Date().toISOString());
  }catch (e) {
    console.log(e);
  }
};
