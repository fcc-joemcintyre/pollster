const fontSize = ['11px', '12px', '14px', '16px'];
const headingSize = ['30px', '30px', '24px', '18px', '16px'];

const themes = {
  base: {
    colorPrimary: '#7AC1C1',
    colorRowBgEven: '#F0F8FF',
    colorRowBgOdd: '#FFFFE0',
    colorRowHoverBorder: '#0000F8',
    colorBarFill: '#B0C4DE',
    font: 'Lato',
    fontSize,
    fontWeight: [400, 700],
    headingFont: 'Merriweather',
    headingSize,
    headingWeight: [400, 700],
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
    font: 'Lato',
    fontSize,
    fontWeight: [400, 700],
    headingFont: 'Merriweather',
    headingSize,
    headingWeight: [400, 700],
    buttonPrimaryColor: '#000000',
    buttonPrimaryBG: '#F0F8FF',
    buttonColor: '#000000',
    buttonBG: '#F0F8FF',
  },
};

export function getTheme (name) {
  return themes[name] || themes.base;
}
