import { ClassValue } from 'clsx';
import { default as default_2 } from 'react';

export declare interface Address {
    street: string;
    postalCode: string;
    city: string;
    country: string;
}

export declare interface AddressInput {
    reference?: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
}

export declare interface AddressValidationResult {
    isValid: boolean;
    normalizedAddress?: Address;
    suggestions?: Address[];
    error?: string;
    apiResponse?: ApiResponse;
    confidence?: number;
}

export declare const AddressValidator: default_2.FC<AddressValidatorProps>;

export declare interface AddressValidatorProps {
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

export declare interface ApiResponse {
    input: AddressInput;
    valid: boolean;
    reason: string;
    reasonId: string;
    responseAddress: ResponseAddress;
    confidence?: number;
}

export declare interface ClassNames {
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

export declare function cn(...inputs: ClassValue[]): string;

export declare interface Country {
    code: string;
    name: string;
}

export declare type CountryFormat = 'code' | 'name';

export declare const defaultClassNames: {
    inputWrapper: string;
    icon: string;
    input: string;
    gridContainer: string;
    select: string;
    validatingMessage: string;
    validationSuccess: string;
    successMessage: string;
    normalizedAddress: string;
    normalizedTitle: string;
    errorMessage: string;
    useButton: string;
};

export declare const defaultCountries: Country[];

export declare type Language = keyof typeof translations;

declare interface Location_2 {
    lat: number;
    lon: number;
}
export { Location_2 as Location }

export declare interface ResponseAddress {
    numberOfStreet: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
    normalized: string;
    location: Location_2;
}

export declare const translations: {
    readonly en: {
        actions: {
            use: string;
        };
        placeholders: {
            city: string;
            country: string;
            postalCode: string;
            street: string;
        };
        powered: string;
        validation: {
            alternative: string;
            confidence: string;
            error: string;
            inProgress: string;
            success: string;
        };
    };
    readonly fr: {
        actions: {
            use: string;
        };
        placeholders: {
            city: string;
            country: string;
            postalCode: string;
            street: string;
        };
        powered: string;
        validation: {
            alternative: string;
            confidence: string;
            error: string;
            inProgress: string;
            success: string;
        };
    };
    readonly es: {
        actions: {
            use: string;
        };
        placeholders: {
            city: string;
            country: string;
            postalCode: string;
            street: string;
        };
        powered: string;
        validation: {
            alternative: string;
            confidence: string;
            error: string;
            inProgress: string;
            success: string;
        };
    };
};

export declare function useAddressValidation(apiKey?: string): {
    validateAddress: (address: Address) => Promise<AddressValidationResult>;
    isValidating: boolean;
    validationResult: AddressValidationResult;
};

export { }
