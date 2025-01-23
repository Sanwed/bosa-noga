import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from './store.ts';

interface Props {
  children: ReactNode;
}

function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
