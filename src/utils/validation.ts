export const validateBigInt = (value: string | number) => {
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
};
