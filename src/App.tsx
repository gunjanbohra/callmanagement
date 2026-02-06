import { RecoilRoot } from 'recoil';
import { AppRouter } from './routes';

export default function App() {
  return (
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  );
}