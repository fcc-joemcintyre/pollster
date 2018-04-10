const fontSize = ['11px', '12px', '14px', '16px'];
const headingSize = ['30px', '30px', '24px', '18px', '16px'];

const base = {
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
  menuText: `
    font-family: Lato, sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
  `,
  menuTextHover: `
    color: #000000;
  `,
  menuTextActive: `
    color: #000000;
    font-weight: 700;
  `,
  menuColor: '#7AC1C1',
};

const themes = {
  base,
  gray: {
    ...base,
    colorPrimary: '#AAAAAA',
    colorRowBgEven: '#CCCCCC',
    colorRowBgOdd: '#EEEEEE',
    colorRowHoverBorder: '#F7F7F7',
    colorBarFill: '#AAAAAA',
  },
};

export function getTheme (name) {
  return themes[name] || themes.base;
}
