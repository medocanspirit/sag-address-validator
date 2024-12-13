import { API_CONFIG } from "./config";
export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: status
        });
        this.name = "ApiError";
    }
}
export async function validateAddressWithApi(address, apiKey) {
    try {
        const input = {
            address: address.street,
            zipCode: address.postalCode,
            city: address.city,
            country: address.country,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        if (apiKey) {
            headers["Authorization"] = `Bearer ${apiKey}`;
        }
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.addressSearch}`, {
            method: "POST",
            headers,
            body: JSON.stringify(input),
        });
        if (!response.ok) {
            throw new ApiError("Address validation failed", response.status);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError("Network error occurred");
    }
}
