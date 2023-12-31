import "./styles.css";
const Input = (props) => {
  const { type, placeholder, value, onChange, className } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`custom-input ${className}`}
    />
  );
};
export default Input;
