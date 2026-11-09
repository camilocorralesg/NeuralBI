import { lazyModule } from '../lazyModule';

// Every Industries solution is shown as the NeuralBI product it ships, by sector and card (`frame` 'window' or
// 'devices'). None of the sixteen rides in the first load: one shows at a time and the section sits far down the page
// (components/graphics/IndustryArchitecture.jsx brings them on approach). One chunk per sector: its four load together
// anyway, and the code they share (the UI primitives, the storyline) ships once per sector instead of once per product.
const entry = (load, frame) => ({ chunk: lazyModule(load), frame });
export const mockups = {
  'supply-chain': [
    entry(() => import(/* webpackChunkName: "mockups-supply-chain" */ '../mockups/SupplyControlTower'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-supply-chain" */ '../mockups/FieldOps'), 'devices'),
    entry(() => import(/* webpackChunkName: "mockups-supply-chain" */ '../mockups/DocumentIntelligence'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-supply-chain" */ '../mockups/LogisticsCopilot'), 'window'),
  ],
  fintech: [
    entry(() => import(/* webpackChunkName: "mockups-fintech" */ '../mockups/LiquidityMonitor'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-fintech" */ '../mockups/CreditDesk'), 'devices'),
    entry(() => import(/* webpackChunkName: "mockups-fintech" */ '../mockups/ComplianceFlow'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-fintech" */ '../mockups/FraudCopilot'), 'window'),
  ],
  manufacturing: [
    entry(() => import(/* webpackChunkName: "mockups-manufacturing" */ '../mockups/LineMonitor'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-manufacturing" */ '../mockups/FloorInspector'), 'devices'),
    entry(() => import(/* webpackChunkName: "mockups-manufacturing" */ '../mockups/MaintenanceFlow'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-manufacturing" */ '../mockups/FloorAssistant'), 'window'),
  ],
  retail: [
    entry(() => import(/* webpackChunkName: "mockups-retail" */ '../mockups/OmnichannelSales'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-retail" */ '../mockups/StoreOps'), 'devices'),
    entry(() => import(/* webpackChunkName: "mockups-retail" */ '../mockups/RestockFlow'), 'window'),
    entry(() => import(/* webpackChunkName: "mockups-retail" */ '../mockups/MerchCopilot'), 'window'),
  ],
};

/** One sector's four products. */
export const loadSector = (industry) => Promise.all((mockups[industry] || []).map((item) => item.chunk.load()));
/** Every product, as the tests and an idle browser fetch them. */
export const preloadMockups = () => Promise.all(Object.keys(mockups).map(loadSector));
