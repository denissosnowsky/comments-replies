import s from "./Image.module.sass";

interface ImagePropsType {
  height: string;
  width: string;
  image: string;
}

const Image: React.FC<ImagePropsType> = ({ height, width, image }) => {
  return (
    <div className={s.wrapper} style={{ height, width }}>
      <img className={s.image} alt="avatar" src={image}></img>
    </div>
  );
};

export default Image;
