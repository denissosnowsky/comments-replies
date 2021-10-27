import s from "./Container.module.sass";

const Container: React.FC = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
