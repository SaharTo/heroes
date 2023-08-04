import "./styles.css"; // Import the CSS file

const Button = (props) => {
  const { label, onClick, className, disabled } = props;
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
