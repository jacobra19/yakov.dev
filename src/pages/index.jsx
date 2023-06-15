import React from 'react';
import MDXContent from '@theme/MDXContent';
import CodeBlock from '@theme/CodeBlock';
import MyComponentSource from '!!raw-loader!./snippet';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function Header() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{siteConfig.title}</h1>
    </header>
  );
}

export default function Home() {
  const {
    siteConfig: { tagline },
  } = useDocusaurusContext();

  return (
    <Layout description={tagline}>
      <div className={styles.container}>
      <Header />
        <div className='col col--5'>
          <MDXContent>
            <CodeBlock language='ts'>{MyComponentSource}</CodeBlock>
          </MDXContent>
        </div>
      </div>
    </Layout>
  );
}
