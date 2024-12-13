import { jsxs as m, jsx as n } from "react/jsx-runtime";
import { useState as S, useCallback as k, useMemo as L, useEffect as U } from "react";
import { Loader as B, CheckCircle as O, MapPinOff as $ } from "lucide-react";
import { clsx as D } from "clsx";
import { twMerge as G } from "tailwind-merge";
const z = {
  baseUrl: "https://icr-api.sortandgroup.fr/api/",
  endpoints: {
    addressSearch: "addresses/_search"
  }
};
class g extends Error {
  constructor(l, t) {
    super(l), this.status = t, this.name = "ApiError";
  }
}
async function j(e, l) {
  try {
    const t = {
      address: e.street,
      zipCode: e.postalCode,
      city: e.city,
      country: e.country
    }, u = {
      "Content-Type": "application/json"
    };
    l && (u.Authorization = `Bearer ${l}`);
    const o = await fetch(
      `${z.baseUrl}${z.endpoints.addressSearch}`,
      {
        method: "POST",
        headers: u,
        body: JSON.stringify(t)
      }
    );
    if (!o.ok)
      throw new g("Address validation failed", o.status);
    return await o.json();
  } catch (t) {
    throw t instanceof g ? t : new g("Network error occurred");
  }
}
function H(e) {
  const [l, t] = S(!1), [u, o] = S({ isValid: !1 });
  return {
    validateAddress: k(
      async (s) => {
        if (!s.street || !s.postalCode || !s.city || !s.country) {
          const r = {
            isValid: !1,
            error: "ERROR"
          };
          return o(r), r;
        }
        t(!0);
        try {
          const r = await j(
            {
              street: s.street,
              postalCode: s.postalCode,
              city: s.city,
              country: s.country
            },
            e
          );
          console.log(e);
          const f = {
            isValid: r.valid,
            apiResponse: r,
            normalizedAddress: r.valid ? {
              street: `${r.responseAddress.numberOfStreet} ${r.responseAddress.street}`,
              postalCode: r.responseAddress.zipCode,
              city: r.responseAddress.city,
              country: r.responseAddress.country
            } : void 0,
            confidence: r.confidence ?? 0,
            error: r.valid ? void 0 : r.reason
          };
          return o(f), f;
        } catch (r) {
          const f = {
            isValid: !1,
            error: r instanceof g ? `Validation error: ${r.message}` : "An error occured during validation"
          };
          return o(f), f;
        } finally {
          t(!1);
        }
      },
      [e]
    ),
    isValidating: l,
    validationResult: u
  };
}
const W = {
  actions: {
    use: "Use this address"
  },
  placeholders: {
    city: "City",
    country: "Select a country",
    postalCode: "Postal code",
    street: "Street address"
  },
  powered: "Powered by",
  validation: {
    alternative: "We've found an alternative address:",
    confidence: "Confidence:",
    error: "Invalid address",
    inProgress: "Validation in progress...",
    success: "Address validated"
  }
}, F = {
  actions: {
    use: "Utiliser cette adresse"
  },
  placeholders: {
    city: "Ville",
    country: "Sélectionnez un pays",
    postalCode: "Code postal",
    street: "Adresse"
  },
  powered: "Propulsé par",
  validation: {
    alternative: "Nous avons trouvé une adresse alternative :",
    confidence: "Confiance :",
    error: "Adresse invalide",
    inProgress: "Validation en cours...",
    success: "Adresse validée"
  }
}, _ = {
  actions: {
    use: "Utiliza esta dirección"
  },
  placeholders: {
    city: "Ciudad",
    country: "Seleccione un país",
    postalCode: "Código postal",
    street: "Dirección"
  },
  powered: "Impulsado por",
  validation: {
    alternative: "Hemos encontrado una dirección alternativa :",
    confidence: "Confianza :",
    error: "Dirección no válida",
    inProgress: "Validación en curso...",
    success: "Dirección validada"
  }
}, J = {
  en: W,
  fr: F,
  es: _
};
function Y(e = "en") {
  return { t: L(() => (u) => {
    const o = u.split(".");
    let p = J[e];
    for (const s of o) {
      if ((p == null ? void 0 : p[s]) === void 0)
        return console.warn(`Translation key not found: ${u}`), u;
      p = p[s];
    }
    return p;
  }, [e]) };
}
const Z = {
  inputWrapper: "relative mb-4",
  icon: "h-5 w-5 text-gray-400",
  input: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  gridContainer: "grid grid-cols-2 gap-4 mb-4",
  select: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4",
  validatingMessage: "flex items-center text-gray-500",
  validationSuccess: "mt-2",
  successMessage: "flex items-center text-green-600",
  normalizedAddress: "mt-4 text-sm bg-blue-50 p-3 rounded-md",
  normalizedTitle: "font-medium mb-1",
  errorMessage: "flex items-center text-red-600",
  useButton: "mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
}, q = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" }
];
function Q(...e) {
  return G(D(e));
}
const ne = ({
  value: e,
  onChange: l,
  onValidation: t,
  className: u = "",
  disabled: o = !1,
  classNames: p = {},
  unstyled: s = !1,
  countries: r = q,
  countryFormat: f = "code",
  language: C = "en",
  apiKey: P
}) => {
  var w;
  const { validateAddress: R, isValidating: V, validationResult: i } = H(C), a = {
    ...s ? {} : Z,
    ...p
  }, { t: c } = Y(C);
  U(() => {
    t == null || t(i);
  }, [i, t]);
  const E = (d) => s ? "" : d >= 0.8 ? "text-green-600" : d >= 0.5 ? "text-yellow-600" : "text-orange-600", M = (d) => {
    l(d);
  }, v = (d) => (T) => {
    const h = T.target.value;
    let b = h;
    if (d === "country" && h) {
      const y = r.find(
        (x) => f === "code" ? x.code === h : x.name === h
      );
      b = y ? f === "code" ? y.code : y.name : h;
    }
    const N = { ...e, [d]: b };
    l(N), R(N);
  }, A = ((w = i.apiResponse) == null ? void 0 : w.confidence) ?? 0, I = E(A);
  return /* @__PURE__ */ m("div", { className: u, children: [
    /* @__PURE__ */ n("div", { className: a.inputWrapper, children: /* @__PURE__ */ n(
      "input",
      {
        type: "text",
        value: e.street,
        onChange: v("street"),
        placeholder: c("placeholders.street"),
        className: a.input,
        disabled: o
      }
    ) }),
    /* @__PURE__ */ m("div", { className: a.gridContainer, children: [
      /* @__PURE__ */ n(
        "input",
        {
          type: "text",
          value: e.postalCode,
          onChange: v("postalCode"),
          placeholder: c("placeholders.postalCode"),
          className: a.input,
          disabled: o
        }
      ),
      /* @__PURE__ */ n(
        "input",
        {
          type: "text",
          value: e.city,
          onChange: v("city"),
          placeholder: c("placeholders.city"),
          className: a.input,
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ m(
      "select",
      {
        value: e.country,
        onChange: v("country"),
        className: a.select,
        disabled: o,
        children: [
          /* @__PURE__ */ n("option", { value: "", children: c("placeholders.country") }),
          r.map((d) => /* @__PURE__ */ n(
            "option",
            {
              value: f === "code" ? d.code : d.name,
              children: d.name
            },
            d.code
          ))
        ]
      }
    ),
    V ? /* @__PURE__ */ m("div", { className: a.validatingMessage, children: [
      !s && /* @__PURE__ */ n("span", { className: "animate-spin mr-2", children: /* @__PURE__ */ n(B, {}) }),
      c("validation.inProgress")
    ] }) : i.isValid ? /* @__PURE__ */ m("div", { className: a.validationSuccess, children: [
      /* @__PURE__ */ m(
        "div",
        {
          className: Q(
            a.successMessage,
            !s && I
          ),
          children: [
            !s && /* @__PURE__ */ n(O, { className: "h-5 w-5 mr-2" }),
            c("validation.success"),
            " (",
            c("validation.confidence"),
            " ",
            Math.round(A * 100),
            "%)"
          ]
        }
      ),
      i.normalizedAddress && /* @__PURE__ */ m("div", { className: a.normalizedAddress, children: [
        /* @__PURE__ */ n("p", { className: a.normalizedTitle, children: c("validation.alternative") }),
        /* @__PURE__ */ n("p", { children: i.normalizedAddress.street }),
        /* @__PURE__ */ m("p", { children: [
          i.normalizedAddress.postalCode,
          " ",
          i.normalizedAddress.city
        ] })
      ] }),
      i.normalizedAddress && /* @__PURE__ */ n(
        "button",
        {
          onClick: () => {
            i.normalizedAddress && M(
              i.normalizedAddress
            );
          },
          className: a.useButton,
          type: "button",
          children: c("actions.use")
        }
      )
    ] }) : i.error ? /* @__PURE__ */ n("div", { className: a.validationSuccess, children: /* @__PURE__ */ m("div", { className: a.errorMessage, children: [
      !s && /* @__PURE__ */ n($, { className: "h-5 w-5 mr-2" }),
      c("validation.error"),
      " (",
      i.error,
      ")"
    ] }) }) : null,
    !P && /* @__PURE__ */ m("div", { className: s ? "" : "mt-4 text-xs", children: [
      c("powered"),
      " ",
      /* @__PURE__ */ n(
        "a",
        {
          href: "https://www.sortandgroup.com/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline hover:text-blue-800",
          children: "Sort&Group Solutions"
        }
      )
    ] })
  ] });
};
export {
  ne as AddressValidator,
  Q as cn,
  Z as defaultClassNames,
  q as defaultCountries,
  J as translations,
  H as useAddressValidation
};
//# sourceMappingURL=index.js.map
