import TransactionDetail from "../../../transaction-detail"

export default function Page({ params }: { params: { id: string } }) {
  return <TransactionDetail id={params.id} />
}
