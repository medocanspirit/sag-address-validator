import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { CheckCircle, MapPinOff, Loader } from 'lucide-react';
import { useAddressValidation } from '../hooks/useAddressValidation';
import { useTranslation } from '../hooks/useTranslations';
import { defaultClassNames } from '../styles/default';
import { defaultCountries } from '../data/countries';
import { cn } from '../utils';
export const AddressValidator = ({ value, onChange, onValidation, className = '', disabled = false, classNames = {}, unstyled = false, countries = defaultCountries, countryFormat = 'code', language = 'en', apiKey, }) => {
    const { validateAddress, isValidating, validationResult } = useAddressValidation(language);
    const styles = unstyled ? {} : defaultClassNames;
    const finalClassNames = {
        ...styles,
        ...classNames,
    };
    const { t } = useTranslation(language);
    useEffect(() => {
        onValidation?.(validationResult);
    }, [validationResult, onValidation]);
    const getConfidenceColor = (confidence) => {
        if (!unstyled) {
            if (confidence >= 0.8)
                return 'text-green-600';
            if (confidence >= 0.5)
                return 'text-yellow-600';
            return 'text-orange-600';
        }
        return '';
    };
    const handleUseNormalizedAddress = (normalizedAddress) => {
        onChange(normalizedAddress);
    };
    const handleChange = (field) => (e) => {
        const newValue = e.target.value;
        let finalValue = newValue;
        // Convert country according to the format
        if (field === 'country' && newValue) {
            const selectedCountry = countries.find((c) => countryFormat === 'code' ? c.code === newValue : c.name === newValue);
            finalValue = selectedCountry
                ? countryFormat === 'code'
                    ? selectedCountry.code
                    : selectedCountry.name
                : newValue;
        }
        const newAddress = { ...value, [field]: finalValue };
        onChange(newAddress);
        validateAddress(newAddress);
    };
    const confidence = validationResult.apiResponse?.confidence ?? 0;
    const confidenceColor = getConfidenceColor(confidence);
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: finalClassNames.inputWrapper, children: _jsx("input", { type: "text", value: value.street, onChange: handleChange('street'), placeholder: t('placeholders.street'), className: finalClassNames.input, disabled: disabled }) }), _jsxs("div", { className: finalClassNames.gridContainer, children: [_jsx("input", { type: "text", value: value.postalCode, onChange: handleChange('postalCode'), placeholder: t('placeholders.postalCode'), className: finalClassNames.input, disabled: disabled }), _jsx("input", { type: "text", value: value.city, onChange: handleChange('city'), placeholder: t('placeholders.city'), className: finalClassNames.input, disabled: disabled })] }), _jsxs("select", { value: value.country, onChange: handleChange('country'), className: finalClassNames.select, disabled: disabled, children: [_jsx("option", { value: "", children: t('placeholders.country') }), countries.map((country) => (_jsx("option", { value: countryFormat === 'code' ? country.code : country.name, children: country.name }, country.code)))] }), isValidating ? (_jsxs("div", { className: finalClassNames.validatingMessage, children: [!unstyled && (_jsx("span", { className: "animate-spin mr-2", children: _jsx(Loader, {}) })), t('validation.inProgress')] })) : validationResult.isValid ? (_jsxs("div", { className: finalClassNames.validationSuccess, children: [_jsxs("div", { className: cn(finalClassNames.successMessage, !unstyled && confidenceColor), children: [!unstyled && _jsx(CheckCircle, { className: "h-5 w-5 mr-2" }), t('validation.success'), " (", t('validation.confidence'), ' ', Math.round(confidence * 100), "%)"] }), validationResult.normalizedAddress && (_jsxs("div", { className: finalClassNames.normalizedAddress, children: [_jsx("p", { className: finalClassNames.normalizedTitle, children: t('validation.alternative') }), _jsx("p", { children: validationResult.normalizedAddress.street }), _jsxs("p", { children: [validationResult.normalizedAddress.postalCode, ' ', validationResult.normalizedAddress.city] })] })), validationResult.normalizedAddress && (_jsx("button", { onClick: () => {
                            if (validationResult.normalizedAddress) {
                                handleUseNormalizedAddress(validationResult.normalizedAddress);
                            }
                        }, className: finalClassNames.useButton, type: "button", children: t('actions.use') }))] })) : validationResult.error ? (_jsx("div", { className: finalClassNames.validationSuccess, children: _jsxs("div", { className: finalClassNames.errorMessage, children: [!unstyled && _jsx(MapPinOff, { className: "h-5 w-5 mr-2" }), t('validation.error'), " (", validationResult.error, ")"] }) })) : null, !apiKey && (_jsxs("div", { className: !unstyled ? 'mt-4 text-xs' : '', children: [t('powered'), ' ', _jsx("a", { href: "https://www.sortandgroup.com/", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-blue-800", children: "Sort&Group Solutions" })] }))] }));
};
