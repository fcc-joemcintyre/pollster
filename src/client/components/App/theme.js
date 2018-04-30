const base = {
  // page content settings
  contentWidth: '768px',
  contentPadding: '100px 0 20px 0',

  // brand color
  brandColor: '#7ac1c1',

  // app colors
  colorRowBgEven: '#f0f8ff',
  colorRowBgOdd: '#ffffe0',
  colorRowHoverBorder: '#0000f8',
  colorBarFill: '#b0c4de',

  // fonts
  fontSize: ['10px', '12px', '14px', '16px', '18px', '22px', '26px'],
  fonts: {
    global: `
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      line-height: 1.2;
    `,
    h1: `
      font-family: 'Merriweather', sans-serif;
      font-size: 30px;
      font-weight: 400;
      margin-top: 10px;
      margin-bottom: 10px;
    `,
    h2: `
      font-family: 'Lato', sans-serif;
      font-size: 24px;
      font-weight: 400;
      margin-top: 10px;
      margin-bottom: 10px;
    `,
    h6: `
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: 700;
      margin-top: 10px;
      margin-bottom: 10px;
    `,
  },

  // buttons
  buttonColor: '#000000',
  buttonBG: '#f0f8ff',
  buttonPrimaryColor: '#000000',
  buttonPrimaryBG: '#f0f8ff',

  // menu
  menuText: `
    font-family: 'Lato', sans-serif;
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
  menuColor: '#7ac1c1',
};

const themes = {
  base,
  gray: {
    ...base,
    brandColor: '#aaaaaa',
    colorRowBgEven: '#cccccc',
    colorRowBgOdd: '#eeeeee',
    colorRowHoverBorder: '#f7f7f7',
    colorBarFill: '#aaaaaa',
    menuColor: '#aaaaaa',
  },
};

export function getTheme (name) {
  return themes[name] || themes.base;
}
