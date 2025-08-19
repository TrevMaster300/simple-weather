export default function ErrorAlert({ message }: { message: string }) {
  if (!message) return null;
  return <div className="alert" role="alert" aria-live="assertive">{message}</div>;
}
