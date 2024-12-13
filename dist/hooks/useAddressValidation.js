import { useState, useCallback } from 'react';
import { validateAddressWithApi } from '../api/addressService';
import { ApiError } from '../api/addressService';
export function useAddressValidation(apiKey) {
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState({ isValid: false });
    const validateAddress = useCallback(async (address) => {
        if (!address.street ||
            !address.postalCode ||
            !address.city ||
            !address.country) {
            const result = {
                isValid: false,
                error: 'ERROR',
            };
            setValidationResult(result);
            return result;
        }
        setIsValidating(true);
        try {
            const apiResponse = await validateAddressWithApi({
                street: address.street,
                postalCode: address.postalCode,
                city: address.city,
                country: address.country,
            }, apiKey);
            console.log(apiKey);
            const result = {
                isValid: apiResponse.valid,
                apiResponse,
                normalizedAddress: apiResponse.valid
                    ? {
                        street: `${apiResponse.responseAddress.numberOfStreet} ${apiResponse.responseAddress.street}`,
                        postalCode: apiResponse.responseAddress.zipCode,
                        city: apiResponse.responseAddress.city,
                        country: apiResponse.responseAddress.country,
                    }
                    : undefined,
                confidence: apiResponse.confidence ?? 0,
                error: apiResponse.valid ? undefined : apiResponse.reason,
            };
            setValidationResult(result);
            return result;
        }
        catch (error) {
            const result = {
                isValid: false,
                error: error instanceof ApiError
                    ? `Validation error: ${error.message}`
                    : 'An error occured during validation',
            };
            setValidationResult(result);
            return result;
        }
        finally {
            setIsValidating(false);
        }
    }, [apiKey]);
    return {
        validateAddress,
        isValidating,
        validationResult,
    };
}
