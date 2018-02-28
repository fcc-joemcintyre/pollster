const sizes = ['10px', '12px', '14px', '16px', '18px', '24px', '36px'];
const themes = {
  base: {
    colorPrimary: '#7AC1C1',
    colorRowBgEven: '#F0F8FF',
    colorRowBgOdd: '#FFFFE0',
    colorRowHoverBorder: '#0000F8',
    colorBarFill: '#B0C4DE',
    font: ['Lato', 'Merriweather'],
    fontSize: [sizes, sizes],
    fontWeight: [[400, 700], [400, 700]],
    buttonPrimaryColor: '#000000',
    buttonPrimaryBG: '#F0F8FF',
    buttonColor: '#000000',
    buttonBG: '#F0F8FF',
  },
  gray: {
    colorPrimary: '#AAAAAA',
    colorRowBgEven: '#CCCCCC',
    colorRowBgOdd: '#EEEEEE',
    colorRowHoverBorder: '#F7F7F7',
    colorBarFill: '#AAAAAA',
    font: ['Lato', 'Merriweather'],
    fontSize: [sizes, sizes],
    fontWeight: [[400, 700], [400, 700]],
    buttonPrimaryColor: '#000000',
    buttonPrimaryBG: '#F0F8FF',
    buttonColor: '#000000',
    buttonBG: '#F0F8FF',
  },
};

export function getTheme (name) {
  return themes[name] || themes.base;
}
