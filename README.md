# SAG Address Validator

A React component for address validation and normalization using the [Sort&Group Solutions](https://www.sortandgroup.com/) API.

## GitHub installation

```bash
npm install github:medocanspirit/sag-address-validator
```

or add it directly to your package.json:

```json
{
  "dependencies": {
    "@medocanspirit/sag-address-validator": "github:medocanspirit/sag-address-validator"
  }
}
```

## Use

```tsx
import { AddressValidator } from '@medocanspirit/sag-address-validator';
import '@medocanspirit/sag-address-validator/dist/style.css';

function MyForm() {
  const [address, setAddress] = useState({
    street: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const handleValidation = (result) => {
    if (result.isValid) {
      console.log('Standardized address:', result.normalizedAddress);
    }
  };

  return (
    <AddressValidator
      value={address}
      onChange={setAddress}
      onValidation={handleValidation}
    />
  );
}
```

## Props

| Name          | Type                                      | Default          | Description                                                    |
| ------------- | ----------------------------------------- | ---------------- | -------------------------------------------------------------- |
| value         | Address                                   | -                | Address object including street, postal code, city and country |
| onChange      | (address: Address) => void                | -                | Callback invoked on address modification                       |
| onValidation  | (result: AddressValidationResult) => void | -                | Callback invoked after validation                              |
| className     | string                                    | ''               | Additional CSS classes                                         |
| disabled      | boolean                                   | false            | Disable input fields (default: false)                          |
| unstyled      | boolean                                   | false            | Disable default Tailwind styles (default: false)               |
| countries     | Country[]                                 | defaultCountries | List of available countries (optional)                         |
| countryFormat | 'code' \| 'name'                          | code             | Country value format                                           |
| language      | 'en' \| 'fr' \| 'es'                      | en               | Language                                                       |
| apiKey        | string                                    | undefined        | API Key                                                        |

## Countries

This repository contains a predefined list of countries.

| Country Code | Country Name   |
| ------------ | -------------- |
| AT           | Austria        |
| BE           | Belgium        |
| BG           | Bulgaria       |
| HR           | Croatia        |
| CY           | Cyprus         |
| CZ           | Czech Republic |
| DK           | Denmark        |
| EE           | Estonia        |
| FI           | Finland        |
| FR           | France         |
| DE           | Germany        |
| GR           | Greece         |
| HU           | Hungary        |
| IE           | Ireland        |
| IT           | Italy          |
| LV           | Latvia         |
| LT           | Lithuania      |
| LU           | Luxembourg     |
| MT           | Malta          |
| NL           | Netherlands    |
| PL           | Poland         |
| PT           | Portugal       |
| RO           | Romania        |
| SK           | Slovakia       |
| SI           | Slovenia       |
| ES           | Spain          |
| SE           | Sweden         |

```tsx
interface Country {
  code: string; // Country ISO code (ex: 'FR')
  name: string; // Country name (ex: 'France')
}
```

## Personalization

### API key

You'll need a valid [Sort&Group API key](https://www.sortandgroup.com/) to bypass request limits.

### I18n

This package is internationalized, French, English and Spanish are available.

## Customization

You can style the default elements with your respective classes :

```tsx
const customClassNames = {
  inputWrapper: 'custom-class',
  icon: 'custom-class',
  input: 'custom-class',
  gridContainer: 'custom-class',
  select: 'custom-class',
  validatingMessage: 'custom-class',
  validationSuccess: 'custom-class',
  successMessage: 'custom-class',
  normalizedAddress: 'custom-class',
  normalizedTitle: 'custom-class',
  errorMessage: 'custom-class',
  useButton: 'custom-class',
};

function MyForm() {
  return <AddressValidator classNames={customClassNames} unstyled />;
}
```

## License

MIT

## To do

- Add debounce
