import Image from "next/image";
import styles from "./BlobProfile.module.css";

type BlobProfileProps = {
  imageUrl: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const sizeValueMap = {
  sm: "(max-width: 420px) 160px, (max-width: 768px) 176px, 208px",
  md: "(max-width: 420px) 204px, (max-width: 768px) 240px, 288px",
  lg: "(max-width: 420px) 240px, (max-width: 768px) 280px, 400px",
} as const;

export function BlobProfile({
  imageUrl,
  alt = "Profile",
  size = "lg",
}: BlobProfileProps) {
  const sizeClass = sizeClassMap[size];
  const sizes = sizeValueMap[size];

  return (
    <div className={`${styles.wrapper} ${sizeClass}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.blob}>
        <Image src={imageUrl} alt={alt} fill priority className={styles.image} sizes={sizes} />
      </div>
    </div>
  );
}
