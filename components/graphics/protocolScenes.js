import { lazyModule } from '../lazyModule';

// The three "How we deliver" phase scenes, out of the first load: components/sections/NeuralProtocol.jsx asks for them
// as the section comes within a screen.
export const protocolScenes = lazyModule(() => Promise.all([
  import(/* webpackChunkName: "protocol-scenes" */ './AuditBlueprintScene'),
  import(/* webpackChunkName: "protocol-scenes" */ './ArchitectBuildScene'),
  import(/* webpackChunkName: "protocol-scenes" */ './DeployScaleScene'),
]).then(([audit, build, deploy]) => [audit.AuditBlueprintScene, build.ArchitectBuildScene, deploy.DeployScaleScene]));
