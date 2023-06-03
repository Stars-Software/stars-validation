class Validator {
    constructor() {
        this.errors = [];
    }

    validate(data, schema) {
        for (const fieldName in schema) {
            const fieldSchema = schema[fieldName];
            const fieldValue = data[fieldName];
            this.validateField(fieldName, fieldValue, fieldSchema, data);
        }
        return this.errors;
    }

    validateField(fieldName, fieldValue, fieldSchema, data) {
        if (fieldValue === undefined || fieldValue === null) {
            if (!fieldSchema.optional) {
                this.errors.push(`${fieldName} is required.`);
            }
            return;
        }

        this.validatePattern(fieldName, fieldValue, fieldSchema);
        this.validateEquality(fieldName, fieldValue, fieldSchema, data);
        this.validateType(fieldName, fieldValue, fieldSchema);
        this.validateMinLength(fieldName, fieldValue, fieldSchema);
        this.validateMaxLength(fieldName, fieldValue, fieldSchema);
        this.validateNestedObject(fieldName, fieldValue, fieldSchema);
    }

    validatePattern(fieldName, fieldValue, fieldSchema) {
        if (fieldSchema.pattern && typeof fieldValue === "string") {
            const regex = new RegExp(fieldSchema.pattern);
            if (!regex.test(fieldValue)) {
                this.errors.push(`${fieldName} does not match the required pattern.`);
            }
        }
    }

    validateType(fieldName, fieldValue, fieldSchema) {
        if (fieldSchema.type && typeof fieldValue !== fieldSchema.type) {
            this.errors.push(`${fieldName} should be of type ${fieldSchema.type}.`);
        }
    }

    validateMinLength(fieldName, fieldValue, fieldSchema) {
        if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
            this.errors.push(`${fieldName} should have a minimum length of ${fieldSchema.minLength}.`);
        }
    }

    validateMaxLength(fieldName, fieldValue, fieldSchema) {
        if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
            this.errors.push(`${fieldName} should have a maximum length of ${fieldSchema.maxLength}.`);
        }
    }

    validateNestedObject(fieldName, fieldValue, fieldSchema) {
        if (fieldSchema.schema && typeof fieldValue === "object") {
            const nestedValidator = new Validator();
            const nestedErrors = nestedValidator.validate(fieldValue, fieldSchema.schema);
            if (nestedErrors.length > 0) {
                this.errors.push(...nestedErrors.map((error) => `${fieldName}.${error}`));
            }
        } else if (fieldSchema.schema && typeof fieldValue !== "object") {
            this.errors.push(`${fieldName} should be of type object.`);
        }
    }

    validateEquality(fieldName, fieldValue, fieldSchema, data) {
        if (fieldSchema.equal && fieldValue !== data[fieldSchema.equal]) {
            this.errors.push(`${fieldName} should be equal to ${fieldSchema.equal}.`);
        }
    }
}

// Схема для валидации тестовых данных
const schemaWithNestedObject = {
    name: { type: "string", minLength: 1 },

    age: { type: "number", min: 18 },

    address: {
        type: "object",
        schema: {
            street: {
                schema: {
                    house: { type: "string", minLength: 1 },
                    floor: { type: "number", minLength: 1 },
                    apartment: { type: "number", minLength: 1, optional: true },
                },
            },
            city: { type: "string", minLength: 1 },
        },
    },

    email: { type: "string", maxLength: 50, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, //должна быть собачка, точка, максимум 50 символов

    password: {
        // должна быть заглавная буква, цифра, минимум 8 символов
        type: "string",
        minLength: 8,
        pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
    },
    passwordConfirmation: {
        equal: "password",
    },
};

// Тестовые данные
const dataWithNestedObject = {
    name: "John Doe",
    age: 25,
    address: {
        street: {
            house: "Test name",
            floor: 12,
        },
        city: "New York",
    },
    email: "tsaryk2004@gmail.com",
    password: "Password123",
    passwordConfirmation: "Password123",
};

// Вызов функции validate
const validator = new Validator();
const errors = validator.validate(dataWithNestedObject, schemaWithNestedObject);

// Проверка результатов
if (errors.length > 0) {
    console.error("Validation errors:", errors);
} else {
    console.log("Data is valid.");
}

