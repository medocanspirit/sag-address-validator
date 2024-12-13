import React, { useEffect } from 'react';
import { CheckCircle, MapPinOff, Loader } from 'lucide-react';
import { AddressValidatorProps, Address } from '../types';
import { useAddressValidation } from '../hooks/useAddressValidation';
import { useTranslation } from '../hooks/useTranslations';
import { defaultClassNames } from '../styles/default';
import { defaultCountries } from '../data/countries';
import { cn } from '../utils';

export const AddressValidator: React.FC<AddressValidatorProps> = ({
  value,
  onChange,
  onValidation,
  className = '',
  disabled = false,
  classNames = {},
  unstyled = false,
  countries = defaultCountries,
  countryFormat = 'code',
  language = 'en',
  apiKey,
}) => {
  const { validateAddress, isValidating, validationResult } =
    useAddressValidation(language);
  const styles = unstyled ? {} : defaultClassNames;
  const finalClassNames = {
    ...styles,
    ...classNames,
  };

  const { t } = useTranslation(language as 'en' | 'fr' | 'es');

  useEffect(() => {
    onValidation?.(validationResult);
  }, [validationResult, onValidation]);

  const getConfidenceColor = (confidence: number): string => {
    if (!unstyled) {
      if (confidence >= 0.8) return 'text-green-600';
      if (confidence >= 0.5) return 'text-yellow-600';
      return 'text-orange-600';
    }

    return '';
  };

  const handleUseNormalizedAddress = (normalizedAddress: Address) => {
    onChange(normalizedAddress);
  };

  const handleChange =
    (field: keyof typeof value) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newValue = e.target.value;
      let finalValue = newValue;

      // Convert country according to the format
      if (field === 'country' && newValue) {
        const selectedCountry = countries.find((c) =>
          countryFormat === 'code' ? c.code === newValue : c.name === newValue
        );
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

  return (
    <div className={className}>
      <div className={finalClassNames.inputWrapper}>
        <input
          type="text"
          value={value.street}
          onChange={handleChange('street')}
          placeholder={t('placeholders.street')}
          className={finalClassNames.input}
          disabled={disabled}
        />
      </div>

      <div className={finalClassNames.gridContainer}>
        <input
          type="text"
          value={value.postalCode}
          onChange={handleChange('postalCode')}
          placeholder={t('placeholders.postalCode')}
          className={finalClassNames.input}
          disabled={disabled}
        />
        <input
          type="text"
          value={value.city}
          onChange={handleChange('city')}
          placeholder={t('placeholders.city')}
          className={finalClassNames.input}
          disabled={disabled}
        />
      </div>

      <select
        value={value.country}
        onChange={handleChange('country')}
        className={finalClassNames.select}
        disabled={disabled}
      >
        <option value="">{t('placeholders.country')}</option>
        {countries.map((country) => (
          <option
            key={country.code}
            value={countryFormat === 'code' ? country.code : country.name}
          >
            {country.name}
          </option>
        ))}
      </select>

      {isValidating ? (
        <div className={finalClassNames.validatingMessage}>
          {!unstyled && (
            <span className="animate-spin mr-2">
              <Loader />
            </span>
          )}
          {t('validation.inProgress')}
        </div>
      ) : validationResult.isValid ? (
        <div className={finalClassNames.validationSuccess}>
          <div
            className={cn(
              finalClassNames.successMessage,
              !unstyled && confidenceColor
            )}
          >
            {!unstyled && <CheckCircle className="h-5 w-5 mr-2" />}
            {t('validation.success')} ({t('validation.confidence')}{' '}
            {Math.round(confidence * 100)}%)
          </div>
          {validationResult.normalizedAddress && (
            <div className={finalClassNames.normalizedAddress}>
              <p className={finalClassNames.normalizedTitle}>
                {t('validation.alternative')}
              </p>
              <p>{validationResult.normalizedAddress.street}</p>
              <p>
                {validationResult.normalizedAddress.postalCode}{' '}
                {validationResult.normalizedAddress.city}
              </p>
            </div>
          )}

          {validationResult.normalizedAddress && (
            <button
              onClick={() => {
                if (validationResult.normalizedAddress) {
                  handleUseNormalizedAddress(
                    validationResult.normalizedAddress
                  );
                }
              }}
              className={finalClassNames.useButton}
              type="button"
            >
              {t('actions.use')}
            </button>
          )}
        </div>
      ) : validationResult.error ? (
        <div className={finalClassNames.validationSuccess}>
          <div className={finalClassNames.errorMessage}>
            {!unstyled && <MapPinOff className="h-5 w-5 mr-2" />}
            {t('validation.error')} ({validationResult.error})
          </div>
        </div>
      ) : null}

      {!apiKey && (
        <div className={!unstyled ? 'mt-4 text-xs' : ''}>
          {t('powered')}{' '}
          <a
            href="https://www.sortandgroup.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-800"
          >
            Sort&Group Solutions
          </a>
        </div>
      )}
    </div>
  );
};
