const themes = {
  base: {
    colorPrimary: '#7AC1C1',
    colorRowBgEven: '#F0F8FF',
    colorRowBgOdd: '#FFFFE0',
    colorRowHoverBorder: '#0000F8',
    colorBarFill: '#B0C4DE',
    font: ['Lato', 'Merriweather'],
    fontSize: [[10, 12, 14, 16, 18, 24, 36], [10, 12, 14, 16, 18, 24, 36]],
    fontWeight: [[400, 700], [400, 700]],
  },
  gray: {
    colorPrimary: '#AAAAAA',
    colorRowBgEven: '#CCCCCC',
    colorRowBgOdd: '#EEEEEE',
    colorRowHoverBorder: '#F7F7F7',
    colorBarFill: '#AAAAAA',
    font: ['Lato', 'Merriweather'],
    fontSize: [[10, 12, 14, 16, 18, 24, 36], [10, 12, 14, 16, 18, 24, 36]],
    fontWeight: [[400, 700], [400, 700]],
  },
};

export function getTheme (name) {
  return themes[name] || themes.base;
}

export default getTheme;
