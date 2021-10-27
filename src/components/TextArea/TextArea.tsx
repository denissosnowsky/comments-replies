import { useEffect, useRef } from "react";
import { putFocusAtTheEnd } from "../../utils/putFocusAtTheEnd";
import s from "./TextArea.module.sass";

interface TextAreaPropsType {
  placeholder: string;
  style?: React.CSSProperties | undefined;
  value?: string;
  onChange?: (arg: string) => void;
  makeFocus?: boolean;
}

const TextArea: React.FC<TextAreaPropsType> = ({
  placeholder,
  style,
  value,
  onChange,
  makeFocus,
}) => {
  const ref: React.LegacyRef<HTMLTextAreaElement> | null = useRef(null);

  useEffect(() => {
    makeFocus && ref.current?.focus();
  });

  return (
    <textarea
      className={s.textarea}
      placeholder={placeholder}
      style={style}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      ref={ref}
      onFocus={(e) => putFocusAtTheEnd(e)}
    />
  );
};

export default TextArea;
