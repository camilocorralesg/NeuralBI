import { createContext, useContext } from 'react';

// Shares the scene's id prefix (for gradients, filters and masks) and whether the premium layer is on.
export const IsoContext = createContext({ uid: '', premium: false });
export const useIso = () => useContext(IsoContext);
