const Visit = require('../models/visit');
const incrementVisit = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; 
    const visitRecord = await Visit.findOne({ where: { date: today } });
    if (visitRecord) {
      visitRecord.count += 1;
      await visitRecord.save();
    } else {
      await Visit.create({ date: today, count: 1 });
    }
    res.json({ message: 'Ziyaret sayısı artırıldı' });
  } catch (error) {
    return res.status(500).json({ error: 'Ziyaret artırılırken hata oluştu' });
  }
};
const getVisitData = async (req, res) => {
    try {
      const visitRecords = await Visit.findAll({
        order: [['date', 'ASC']], 
      });
  
      res.json(visitRecords);
    } catch (error) {
      return res.status(500).json({ error: 'Ziyaret verisi alınırken hata oluştu' });
    }
  };
  
module.exports = {
  getVisitData,
  incrementVisit,
};
