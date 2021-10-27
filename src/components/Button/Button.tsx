import s from "./Button.module.sass";

interface ButtonPropsType {
  text: string;
  style?: React.CSSProperties | undefined;
  onClick?: () => void;
}

const Button: React.FC<ButtonPropsType> = ({ text, style, onClick }) => {
  return (
    <button className={s.button} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
