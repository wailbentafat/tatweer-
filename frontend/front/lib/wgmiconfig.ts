import { createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { injected } from 'wagmi/connectors';


const { chains, publicClient } = configureChains(
  [mainnet],  
  [publicProvider()]
);


export const wagmiConfig = createConfig({
  autoConnect: true,  
  connectors: [injected()],  ]
  publicClient,
});
