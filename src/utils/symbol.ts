export function symbolFromU64(value: number): { symbolName: string; precision: number } {
  // Extract the precision (lowest 8 bits)
  let precision = value & 0xff;

  // Check if precision is an ASCII digit (e.g., '4' as 52)
  if (precision >= 48 && precision <= 57) {
      // Convert ASCII '0'-'9' to numeric 0-9
      precision -= 48;
  }

  // Extract the symbol code (bits 8-63)
  let symbolCode = value >>> 8;

  // Convert symbol code to characters
  let symbolName = '';
  while (symbolCode > 0) {
      let charCode = symbolCode & 0xff;
      symbolName += String.fromCharCode(charCode);
      symbolCode >>>= 8;
  }

  // Symbols are stored in reverse order; reverse the string
  symbolName = symbolName.split('').reverse().join('');

  return { symbolName, precision };
}