import { Language } from './i18n';

// API Types
export interface AddressInput {
  reference?: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface ResponseAddress {
  numberOfStreet: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  normalized: string;
  location: Location;
}

export interface ApiResponse {
  input: AddressInput;
  valid: boolean;
  reason: string;
  reasonId: string;
  responseAddress: ResponseAddress;
  confidence?: number;
}

// Component Types
export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface AddressValidationResult {
  isValid: boolean;
  normalizedAddress?: Address;
  suggestions?: Address[];
  error?: string;
  apiResponse?: ApiResponse;
  confidence?: number;
}

export interface ClassNames {
  inputWrapper?: string;
  icon?: string;
  input?: string;
  gridContainer?: string;
  select?: string;
  validatingMessage?: string;
  validationSuccess?: string;
  successMessage?: string;
  normalizedAddress?: string;
  normalizedTitle?: string;
  errorMessage?: string;
  useButton?: string;
}

export type CountryFormat = 'code' | 'name';

export interface AddressValidatorProps {
  value: Address;
  onChange: (address: Address) => void;
  onValidation?: (result: AddressValidationResult) => void;
  className?: string;
  disabled?: boolean;
  classNames?: ClassNames;
  unstyled?: boolean;
  countries?: Country[];
  countryFormat?: CountryFormat;
  language?: Language;
  apiKey?: string;
}
