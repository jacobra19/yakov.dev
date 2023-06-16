import React from 'react';
import styles from './index.module.css';

const ImageCredit = ({ children }) => {
  return (
    <div className={styles.container}>
      <span className={styles.textWrapper}>{children}</span>
    </div>
  );
};

export default ImageCredit;
