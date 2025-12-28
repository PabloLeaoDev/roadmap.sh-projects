import IResponse from "../interfaces/response.interface.ts";

export default function resPattern(
  { success, message, payload, error }: 
  Partial<{ success: boolean, message: string, payload: any, error: Error }>
): IResponse {
  return {
    success: success || false,
    message: message || error?.message || '',
    payload: payload || null
  };
}