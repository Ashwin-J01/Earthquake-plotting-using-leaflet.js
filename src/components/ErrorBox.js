export default function ErrorBox({ errorMsg }) {
  return errorMsg ? (
    <div id="error-message" role="alert">{errorMsg}</div>
  ) : null;
}
