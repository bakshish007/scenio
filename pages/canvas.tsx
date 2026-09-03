import Head from 'next/head';
import CanvasEditor from '../components/CanvasEditor';

export default function Canvas() {
  return (
    <>
      <Head>
        <title>Scenio.AI - Untitled Canvas</title>
      </Head>
      <CanvasEditor />
    </>
  );
}
