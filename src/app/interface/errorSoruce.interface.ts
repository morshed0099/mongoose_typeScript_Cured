export type ErrorSource = {
  path: string | number
  message: string
}[]

export type ErrorRes = {
  statusCode: number
  errorSource: ErrorSource
  message:string
}
