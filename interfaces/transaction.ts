export default interface Transaction {
  _id: string
  user: string
  status: string
  dateProceed: Date
  dateFinish: Date
  amount: number
  balance: number
  detail: string
  type: string
  incomeDetail?: {
    transferText: string
    amount: string
  }
}
