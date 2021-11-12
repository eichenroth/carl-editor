import { Layout } from 'antd';
import { FC } from 'react';
import CarlEditor from './components/carl-editor/CarlEditor';

const App: FC = () => {
  return (
    <Layout className="bg-transparent p-4">
      <div className="container max-w-screen-md mx-auto w-full">
        <CarlEditor />
      </div>
    </Layout>
  );
};

export default App;
