import styles from '@/styles/modules/swatchityLogo.module.scss';

const SwatchityLogoMark = () => {
  return (
    <svg
      id="swatchity-logo-mark"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 60 60"
      className={`max-h-3 mobile-max-h-2 h-full ${styles.root}`}
    >
      <title>Swatchity.com</title>
      <g transform="matrix(2 0 0 2 -399.065 -251.683)">
        <path d="M199.533 125.842v30h15v-15h15v-15z" className={styles.mark} />
        <path d="M214.533 155.842v-15h15z" className={styles.corner} />
      </g>
      {/* <g>
        <g display="inline" transform="translate(-20 -60)">
          <path className={styles.mark} d="M20 60v20h10V70h10V60z"></path>
          <path
            className={styles.corner}
            d="M30 80V70h10z"
          ></path>
        </g>
      </g> */}
    </svg>
  );
};

export default SwatchityLogoMark;
