export interface TResponse {
  success: boolean
  errors?: {
    message: string
  }[]
  data?: any
}
