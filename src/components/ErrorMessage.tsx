import "./ErrorMessage.css";

interface Props {
  message: string;
}

function ErrorMessage({ message }: Props) {
  return <div className="ErrorMessage">{message}</div>;
}

export default ErrorMessage;
