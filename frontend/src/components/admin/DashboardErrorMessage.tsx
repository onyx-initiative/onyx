type DashboardErrorMessageProps = {
  message: string
}

export default function DashboardErrorMessage({ message }: DashboardErrorMessageProps) {
  return (
    <div>
      <strong>Error:</strong> {message}
    </div>
  )
}
