import { lazyModule } from '../lazyModule';

// The twelve Arsenal scenes (three chapters for each of the four products), out of the first load: the console asks
// for them as the section approaches, the accordion when a product opens, the modal when it opens
// (components/graphics/ArsenalScene.jsx).
export const arsenalScenes = lazyModule(() => Promise.all([
  import(/* webpackChunkName: "arsenal-scenes" */ './PowerBiAnimations'),
  import(/* webpackChunkName: "arsenal-scenes" */ './PowerAppsAnimations'),
  import(/* webpackChunkName: "arsenal-scenes" */ './PowerAutomateAnimations'),
  import(/* webpackChunkName: "arsenal-scenes" */ './CopilotStudioAnimations'),
]).then(([pbi, pba, pau, mcs]) => ({
  'power-bi': [pbi.PbiDataStorytellingUiAnim, pbi.PbiAiInsightsOverlayAnim, pbi.PbiSemanticModelGraphAnim],
  'power-apps': [pba.PbaThreeParadigmsAnim, pba.PbaProCodeApiEngineAnim, pba.PbaEnterpriseDataverseMeshAnim],
  'power-automate': [pau.PauSelfHealingFlowAnim, pau.PauEventDrivenMeshAnim, pau.PauResilientDlqMeshAnim],
  'copilot-studio': [mcs.McsGroundedReasoningAnim, mcs.McsMultiStepChainAnim, mcs.McsZeroHallucinationFieldAnim],
})));
