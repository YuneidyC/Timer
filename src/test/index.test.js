const { checkMinutesAndSeconds } = require('../index');

// test('should false', () => { expect(false).toBe(false) });

test('Correct format minutes >= 0 and seconds 0 to 59', () => {
    const rta = checkMinutesAndSeconds(-1, 0, 'Correct format minutes >= 0 and seconds 0 to 59');
    expect(rta).toBe(false);
});
