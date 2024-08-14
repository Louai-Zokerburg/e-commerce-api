export interface TResponse {
  success: boolean
  error?: {
    message: string
  }
  data?: any
}
