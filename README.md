# Validator Class Documentation
The Validator class is designed to validate data against a provided schema. It checks various validation rules defined in the schema and collects any validation errors encountered during the process.

## Class Usage
To use the Validator class, follow these steps:

1) Create an instance of the Validator class:

``` javascript
const Validator = require('./Validator'); // Assuming the Validator class is defined in a separate file
const validator = new Validator();
```

2) Define a schema object that represents the validation rules for your data. The schema should be an object where each property corresponds to a field in the data to be validated. The value of each property is an object defining the validation rules for that field.

3) Call the validate method of the Validator instance, passing in the data to be validated and the schema object:

``` javascript
const data = {
  // Your data object to be validated
};

const schema = {
  // Your schema object defining the validation rules
};

const errors = validator.validate(data, schema);
```

4) The validate method will return an array of error messages indicating any validation errors encountered during the validation process. If the returned error array is empty, it means the data passed the validation successfully.

# Class Methods
## constructor()
The constructor initializes an instance of the Validator class. It sets up an empty errors array to store validation errors.

## validate(data, schema)
This method validates the provided data against the given schema. It iterates over each field in the schema and performs validation checks on the corresponding value in the data.

Parameters:

data (object): The data object to be validated.
schema (object): The schema object defining the validation rules.
Returns:

An array of error messages indicating any validation errors encountered during the process. If there are no errors, an empty array is returned.
## validateField(fieldName, fieldValue, fieldSchema, data)
This internal method performs validation checks for a specific field based on the field's validation rules defined in the schema. It is called internally by the validate method for each field in the schema.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (any): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.
data (object): The complete data object being validated.

## validatePattern(fieldName, fieldValue, fieldSchema)
This internal method checks if the fieldValue matches a specified regular expression pattern defined in the fieldSchema. It is called internally by the validateField method if the pattern property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (string): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.

## validateType(fieldName, fieldValue, fieldSchema)
This internal method checks if the fieldValue is of the specified type defined in the fieldSchema. It is called internally by the validateField method if the type property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (any): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.

## validateMinLength(fieldName, fieldValue, fieldSchema)
This internal method checks if the fieldValue has a minimum length as specified in the fieldSchema. It is called internally by the validateField method if the minLength property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (string): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.

## validateMaxLength(fieldName, fieldValue, fieldSchema)
This internal method checks if the fieldValue has a maximum length as specified in the fieldSchema. It is called internally by the validateField method if the maxLength property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (string): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.

## validateNestedObject(fieldName, fieldValue, fieldSchema)
This internal method recursively validates a nested object within the data. It creates a new instance of the Validator class to validate the nested object using its own schema. It is called internally by the validateField method if the schema property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (object): The value of the field in the data (expected to be an object).
fieldSchema (object): The validation rules defined for the field.
## validateEquality(fieldName, fieldValue, fieldSchema, data)
This internal method checks if the fieldValue is equal to another field in the data as specified in the fieldSchema. It is called internally by the validateField method if the equal property is defined for the field.

Parameters:
fieldName (string): The name of the field being validated.
fieldValue (any): The value of the field in the data.
fieldSchema (object): The validation rules defined for the field.
data (object): The complete data object being validated.

## Example
Here's an example of how you can use the Validator class:

``` javascript
const Validator = require('./Validator');
const validator = new Validator();

const data = {
  username: 'john_doe',
  password: 'secretpassword',
  email: 'john@example.com',
};

const schema = {
  username: { type: 'string', minLength: 5, maxLength: 20 },
  password: { type: 'string', minLength: 8 },
  email: { type: 'string', pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
};

const errors = validator.validate(data, schema);
console.log(errors);
```

In this example, the Validator instance is created, and the validate method is called with a data object and a schema object. The schema defines validation rules for each field (username, password, and email). The validate method returns an array of error messages indicating any validation errors encountered during the process. The errors are then logged to the console.
