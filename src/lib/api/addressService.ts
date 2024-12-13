import { API_CONFIG } from "./config";
import { Address, AddressInput, ApiResponse } from "../types";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function validateAddressWithApi(
  address: Address,
  apiKey?: string
): Promise<ApiResponse> {
  try {
    const input: AddressInput = {
      address: address.street,
      zipCode: address.postalCode,
      city: address.city,
      country: address.country,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.addressSearch}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new ApiError("Address validation failed", response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred");
  }
}
