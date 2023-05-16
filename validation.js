function validate(data, schema) {
  const errors = [];

  function validateField(fieldName, fieldValue, fieldSchema) {

    if(fieldValue === undefined || fieldValue === null){
      if(fieldSchema.optional){
        return
      }
      else{
        errors.push(`${fieldName} is required.`);
        return;
      }
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

    if (fieldSchema.schema && typeof fieldValue === 'object') {
      const nestedErrors = validate(fieldValue, fieldSchema.schema);
      if (nestedErrors.length > 0) {
        errors.push(...nestedErrors.map(error => `${fieldName}.${error}`));
      }

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

// Схема для валидации тестовых данных
const schemaWithNestedObject = {
  name: { type: 'string', minLength: 1 },
  age: { type: 'number', min: 18 },
  address: {
    type: 'object',
    schema: {
      street: {
        schema: {
          house: { type: 'string', minLength: 1},
          floor: { type: 'number', minLength: 1 },
          apartment: {type: 'number', minLength: 1, optional: true}
        },
      },
      city: { type: 'string', minLength: 1 },
    },
  },
};

// Тестовые данные
const dataWithNestedObject = {
  name: 'John Doe',
  age: 25,
  address: {
    street: {
      house: "Test name",
      floor: 12
    },
    city: 'New York',
  },
};

// Вызов функции validate
const errors = validate(dataWithNestedObject, schemaWithNestedObject);

// Проверка результатов
if (errors.length > 0) {
  console.error('Validation errors:', errors);
} else {
  console.log('Data is valid.');
}


/* Дополнительные схемы для проверок
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

const editReceiptData = {
    id: "12",
    title: "Apple pie",
    description: "It's a good receipt",
    video: "link",
    products: ["apple", "pear"],
};
*/


