import styles from './page.module.css';
import Link from 'next/link';
const Card = ({ imageUrl, title, link, tlink }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} className={styles.imagen} alt={title} />
      <h4 className={styles.h4}>{title}</h4>
      <Link href={link} className={styles.linktext}>{tlink}</Link>
    </div>
  );
};

export default Card;
