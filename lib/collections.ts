export const collections = ['Menopause', 'Breast Cancer'];

export const makeMachineName = (v: string) => {
  return v
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
};

export const makeReadableName = (v: string) => {
  return v
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
