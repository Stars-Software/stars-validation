const Validator = require("../src/validation.js");

// Тестовые данные для валидации
const testData = {
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

describe("Validator", () => {
    let validator;

    beforeEach(() => {
        validator = new Validator();
    });

    describe("validateField", () => {
        it("should add an error if a required field is missing", () => {
            const fieldName = "name";
            const fieldValue = undefined;
            const fieldSchema = { optional: false };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} is required.`]);
        });

        it("should not add an error if an optional field is missing", () => {
            const fieldName = "name";
            const fieldValue = undefined;
            const fieldSchema = { optional: true };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([]);
        });

        it("should validate the pattern of a field", () => {
            const fieldName = "email";
            const fieldValue = "invalid_email";
            const fieldSchema = { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} does not match the required pattern.`]);
        });

        it("should validate the type of a field", () => {
            const fieldName = "age";
            const fieldValue = "25"; // Тип должен быть number
            const fieldSchema = { type: "number" };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} should be of type ${fieldSchema.type}.`]);
        });

        it("should validate the minimum length of a field", () => {
            const fieldName = "name";
            const fieldValue = ""; // Длина должна быть не менее 1
            const fieldSchema = { minLength: 1 };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([
                `${fieldName} should have a minimum length of ${fieldSchema.minLength}.`,
            ]);
        });

        it("should validate the maximum length of a field", () => {
            const fieldName = "email";
            const fieldValue = "a".repeat(51); // Длина должна быть не более 50
            const fieldSchema = { maxLength: 50 };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([
                `${fieldName} should have a maximum length of ${fieldSchema.maxLength}.`,
            ]);
        });

        it("should validate a nested object field", () => {
            const fieldName = "address";
            const fieldValue = "Invalid nested object"; // Должен быть объект
            const fieldSchema = { schema: {} };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} should be of type object.`]);
        });

        it("should validate the equality of a field with another field", () => {
            const fieldName = "passwordConfirmation";
            const fieldValue = "InvalidPassword"; // Должно быть равно значению поля "password"
            const fieldSchema = { equal: "password" };

            validator.validateField(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} should be equal to ${fieldSchema.equal}.`]);
        });
    });

    describe("validate", () => {
        it("should validate all fields according to the schema", () => {
            const schema = {
                name: { type: "string", minLength: 1 },
                age: { type: "number", min: 18 },
                // Добавьте другие поля схемы
            };

            const errors = validator.validate(testData, schema);

            expect(errors).toEqual([]);
        });

        // Добавьте другие тесты для метода validate
    });

    describe("validatePattern", () => {
        it("should add an error if the pattern does not match", () => {
            const fieldName = "email";
            const fieldValue = "invalid_email";
            const fieldSchema = { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ };

            validator.validatePattern(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([`${fieldName} does not match the required pattern.`]);
        });

        it("should not add an error if the pattern matches", () => {
            const fieldName = "email";
            const fieldValue = "valid_email@example.com";
            const fieldSchema = { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ };

            validator.validatePattern(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });
    });

    describe("validateType", () => {
        it("should add an error if the field type does not match", () => {
            const fieldName = "age";
            const fieldValue = "25"; // Тип должен быть number
            const fieldSchema = { type: "number" };

            validator.validateType(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([`${fieldName} should be of type ${fieldSchema.type}.`]);
        });

        it("should not add an error if the field type matches", () => {
            const fieldName = "age";
            const fieldValue = 25; // Тип number
            const fieldSchema = { type: "number" };

            validator.validateType(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });
    });

    describe("validateMinLength", () => {
        it("should add an error if the field length is less than the minimum length", () => {
            const fieldName = "name";
            const fieldValue = ""; // Длина должна быть не менее 1
            const fieldSchema = { minLength: 1 };

            validator.validateMinLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([
                `${fieldName} should have a minimum length of ${fieldSchema.minLength}.`,
            ]);
        });

        it("should not add an error if the field length is equal to the minimum length", () => {
            const fieldName = "name";
            const fieldValue = "A"; // Длина равна 1, минимальная длина 1
            const fieldSchema = { minLength: 1 };

            validator.validateMinLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });

        it("should not add an error if the field length is greater than the minimum length", () => {
            const fieldName = "name";
            const fieldValue = "John Doe"; // Длина больше 1
            const fieldSchema = { minLength: 1 };

            validator.validateMinLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });
    });

    describe("validateMaxLength", () => {
        it("should add an error if the field length is greater than the maximum length", () => {
            const fieldName = "email";
            const fieldValue = "a".repeat(51); // Длина должна быть не более 50
            const fieldSchema = { maxLength: 50 };

            validator.validateMaxLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([
                `${fieldName} should have a maximum length of ${fieldSchema.maxLength}.`,
            ]);
        });

        it("should not add an error if the field length is equal to the maximum length", () => {
            const fieldName = "email";
            const fieldValue = "a".repeat(50); // Длина равна 50, максимальная длина 50
            const fieldSchema = { maxLength: 50 };

            validator.validateMaxLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });

        it("should not add an error if the field length is less than the maximum length", () => {
            const fieldName = "email";
            const fieldValue = "a".repeat(10); // Длина меньше 50
            const fieldSchema = { maxLength: 50 };

            validator.validateMaxLength(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });
    });

    describe("validateNestedObject", () => {
        it("should validate a nested object field", () => {
            const fieldName = "address";
            const fieldValue = "Invalid nested object"; // Должен быть объект
            const fieldSchema = { schema: {} };

            validator.validateNestedObject(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([`${fieldName} should be of type object.`]);
        });

        it("should not add an error if the nested object is valid", () => {
            const fieldName = "address";
            const fieldValue = {
                street: {
                    house: "Test name",
                    floor: 12,
                },
                city: "New York",
            };
            const fieldSchema = { schema: {} };

            validator.validateNestedObject(fieldName, fieldValue, fieldSchema);

            expect(validator.errors).toEqual([]);
        });
    });

    describe("validateEquality", () => {
        it("should add an error if the field value is not equal to the value of another field", () => {
            const fieldName = "passwordConfirmation";
            const fieldValue = "InvalidPassword"; // Должно быть равно значению поля "password"
            const fieldSchema = { equal: "password" };

            validator.validateEquality(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([`${fieldName} should be equal to ${fieldSchema.equal}.`]);
        });

        it("should not add an error if the field value is equal to the value of another field", () => {
            const fieldName = "passwordConfirmation";
            const fieldValue = "Password123";
            const fieldSchema = { equal: "password" };

            validator.validateEquality(fieldName, fieldValue, fieldSchema, testData);

            expect(validator.errors).toEqual([]);
        });
    });
});
