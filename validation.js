function validate(data, schema) {
  const errors = [];

  function validateField(fieldName, fieldValue, fieldSchema) {
    if (fieldSchema.required && (fieldValue === undefined || fieldValue === null)) {
      errors.push(`${fieldName} is required.`);
      return;
    }

    if (fieldSchema.type && typeof fieldValue !== fieldSchema.type) {
      errors.push(`${fieldName} should be of type ${fieldSchema.type}.`);
      return;
    }

    if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
      errors.push(`${fieldName} should have a minimum length of ${fieldSchema.minLength}.`);
      return;
    }

    if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
      errors.push(`${fieldName} should have a maximum length of ${fieldSchema.maxLength}.`);
      return;
    }

    // Дополнительные проверки, в зависимости от ваших требований
  }

  // Проверка каждого поля в схеме
  for (const fieldName in schema) {
    const fieldSchema = schema[fieldName];
    const fieldValue = data[fieldName];
    validateField(fieldName, fieldValue, fieldSchema);
  }

  return errors;
}

const GroupSchema = {
  title: {
    required: true,
    type: "string",
    minLength: 2,
  },
};

const CreateProductSchema = {
  title: {
    required: true,
    type: "string",
    minLength: 2,
  },
  amount: {
    required: true,
    type: "number",
    min: 10,
  },
  categoryId: {
    required: true,
    type: "string",
    minLength: 2,
  },
};

const EditProductSchema = {
  id: {
    required: true,
    type: "string",
  },
  title: {
    type: "string",
    minLength: 2,
  },
  amount: {
    type: "number",
    min: 10,
  },
  categoryId: {
    type: "string",
    minLength: 2,
  },
};

const CreateRecipeSchema = {
  title: {
    required: true,
    type: "string",
  },
  description: {
    required: true,
    type: "string",
  },
  video: {
    required: true,
    type: "string",
  },
  products: {
    type: "object",
  },
};

const EditRecipeSchema = {
  id: {
    required: true,
    type: "string",
  },
  title: {
    required: true,
    type: "string",
  },
  description: {
    required: true,
    type: "string",
  },
  video: {
    required: true,
    type: "string",
  },
  products: {
    type: "object",
  },
};

const editReceipt = {
  id: "12",
  title: "Apple pie",
  description: "Its a good receipt",
  video: "link",
  products: ["apple", "pear"],
};

const errors = validate(editReceipt, EditRecipeSchema);
if (errors.length === 0) {
  console.log("Data is valid.");
} else {
  console.log("Validation errors:", errors);
}
