export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatCurrency = (val, digits = 2) => {
  if (val !== null) {
    let x = parseFloat(val);
    if (Number.isNaN(x)) {
      return "";
    }
    const decimalLimiter = 10 ** digits;
    x = Math.round((x + Number.EPSILON) * decimalLimiter) / decimalLimiter;
    const parts = x.toFixed(digits).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }
};

export const validate = (requiredFields, input) => {
  const errors = {};

  for (let [key, value] of Object.entries(requiredFields)) {
    if (Array.isArray(input[key])) {
      input[key].forEach((subInput, index) => {
        for (let [subKey, subValue] of Object.entries(value)) {
          const error = validateField(subInput, subKey, subValue);
          if (error) {
            errors[`${key}.${index}.${subKey}`] = error;
          }
        }
      });
    } else {
      const error = validateField(input, key, value);
      if (error) {
        errors[key] = error;
      }
    }
  }

  return { errors };
};

export const validateField = (input, field, label) => {
  if (
    !Object.prototype.hasOwnProperty.call(input, field) ||
    input[field] === null ||
    input[field].length === 0
  ) {
    return [`${label} is required`];
  }
  return null;
};
