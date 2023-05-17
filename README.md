# Repository for data validation

This repository contains code for field validation using JavaScript. It provides a validate(data, schema) function that allows you to validate data against a specific schema.

## Installation
To use this repository, you will need to install Node.js and npm (Node Package Manager).

Clone the repository to your device:

```
git clone https://github.com/Stars-Software/stars-validation
```

Install dependencies with npm:

```
cd <your-repository>

npm install
```

## Usage
### Function validate(data, schema)
This function takes two parameters: data - the data to be validated, and schema - a schema describing the data requirements.

```javascript
const errors = validate(data, schema);
```

The validate function returns an array of validation errors. If the array is empty, then the data was validated successfully.

### Example

```javascript
const schema = {
  // Schema description
};

const data = {
  // Validated data
};

const errors = validate(data, schema);

if (errors.length > 0) {
  console.error('Validation errors:', errors);
} else {
  console.log('Data is valid.');
}
```

## Validation scheme
A validation schema is an object that defines the requirements for each data field.

### Schema example
```javascript
const schema = {
  name: { type: 'string', minLength: 1 },

  age: { type: 'number', min: 18 },
  
  email: { type: 'string', maxLength: 50, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, 
  
  sameEmail: {
    equal:"email"
  },
};
```

In the example above, fieldName is the name of the data field to be validated. The following parameters are defined for each field:

- type (required) - the data type the field should be. Accepts values like 'string', 'number', 'object' etc.
- minLength (optional) - the minimum length of the string (only for the 'string' type) or the minimum value (only for the 'number' type).
- maxLength (optional) - the maximum length of the string (only for the 'string' type) or the maximum value (only for the 'number' type).
- pattern (optional) - a regular expression that the field value must match (only for 'string' type).
- optional - indicates that the field is optional.
- equal (optional) specifies that the value of a field must be equal to the value of another field.

You can add additional parameters to the schema depending on your validation requirements.

### Data example
An object with data suitable for this scheme will look like this:
```javascript
const schema = {
  name: "Mykola"

  age: 21,
  
  email: "tsaryk@gmail.com",
  
  sameEmail:"tsaryk@gmail.com"
};
```

That's it! You now have the necessary information to use the field validation code in this repository. If you have any further questions or need assistance, please let me know.
